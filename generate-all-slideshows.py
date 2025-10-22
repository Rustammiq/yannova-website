#!/usr/bin/env python3
"""
Generate slideshow videos for all Yannova projects that don't have videos yet.
This script automatically creates slideshow videos from project images.
"""

import os
import glob
import subprocess
import json
from pathlib import Path

# Configuration
PROJECTS_DIR = "public/images/projects"
VIDEOS_DIR = "public/videos/projects"
OUTPUT_WIDTH = 1920
OUTPUT_HEIGHT = 1080
DURATION_PER_IMAGE = 2.5  # seconds
TRANSITION_DURATION = 0.5  # seconds

def get_project_images():
    """Get all project images and group them by project number."""
    projects = {}

    # Find all project images
    image_files = glob.glob(f"{PROJECTS_DIR}/project-*-*.jpg")

    for image_path in image_files:
        filename = Path(image_path).stem
        project_num = filename.split('-')[1]

        if project_num not in projects:
            projects[project_num] = []

        projects[project_num].append(image_path)

    return projects

def get_existing_videos():
    """Get list of existing video files."""
    if not os.path.exists(VIDEOS_DIR):
        return set()

    video_files = glob.glob(f"{VIDEOS_DIR}/project-*-slideshow.mp4")
    existing_projects = set()

    for video_path in video_files:
        filename = Path(video_path).stem
        project_num = filename.split('-')[1]
        existing_projects.add(project_num)

    return existing_projects

def create_slideshow_video(project_num, image_paths):
    """Create a slideshow video for a specific project."""
    print(f"📹 Creating slideshow for project {project_num} with {len(image_paths)} images...")

    # Create temporary file list for ffmpeg
    with open(f"temp_{project_num}.txt", "w") as f:
        for duration, image_path in zip([DURATION_PER_IMAGE] * len(image_paths), image_paths):
            # Escape paths for ffmpeg
            escaped_path = image_path.replace("'", "'\\''")
            f.write(f"file '{escaped_path}'\nduration {duration}\n")

        # Add last image again to show it for the full duration
        escaped_path = image_paths[-1].replace("'", "'\\''")
        f.write(f"file '{escaped_path}'\n")

    # Output video path
    output_path = f"{VIDEOS_DIR}/project-{project_num}-slideshow.mp4"

    # Create videos directory if it doesn't exist
    os.makedirs(VIDEOS_DIR, exist_ok=True)

    # FFmpeg command for creating slideshow with crossfade transitions
    cmd = [
        'ffmpeg', '-y',  # Overwrite output files
        '-f', 'concat',  # Use concat demuxer
        '-safe', '0',    # Allow unsafe file paths
        '-i', f'temp_{project_num}.txt',  # Input file list
        '-vf', f'scale={OUTPUT_WIDTH}:{OUTPUT_HEIGHT}:force_original_aspect_ratio=decrease,pad={OUTPUT_WIDTH}:{OUTPUT_HEIGHT}:(ow-iw)/2:(oh-ih)/2,format=yuv420p',  # Scale and pad
        '-c:v', 'libx264',  # Video codec
        '-r', '30',  # Frame rate
        '-pix_fmt', 'yuv420p',  # Pixel format for compatibility
        '-movflags', '+faststart',  # Optimize for web playback
        '-avoid_negative_ts', 'make_zero',  # Fix timestamp issues
        output_path
    ]

    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
        if result.returncode == 0:
            print(f"✅ Successfully created {output_path}")
            return True
        else:
            print(f"❌ Error creating video for project {project_num}:")
            print(result.stderr)
            return False
    except subprocess.TimeoutExpired:
        print(f"⏰ Timeout creating video for project {project_num}")
        return False
    except Exception as e:
        print(f"❌ Exception creating video for project {project_num}: {e}")
        return False
    finally:
        # Clean up temporary file
        if os.path.exists(f"temp_{project_num}.txt"):
            os.remove(f"temp_{project_num}.txt")

def main():
    print("🎬 Yannova Project Slideshow Generator")
    print("=" * 50)

    # Get project images
    projects = get_project_images()
    existing_videos = get_existing_videos()

    print(f"📊 Found {len(projects)} projects with images")
    print(f"🎥 Found {len(existing_videos)} existing videos")

    # Filter projects that need videos
    projects_to_process = {
        proj: images for proj, images in projects.items()
        if len(images) >= 2 and proj not in existing_videos
    }

    print(f"📹 {len(projects_to_process)} projects need videos")

    if not projects_to_process:
        print("✨ All projects already have videos!")
        return

    # Process each project
    successful = 0
    failed = 0

    for project_num, image_paths in projects_to_process.items():
        print(f"\n🔄 Processing project {project_num} ({len(image_paths)} images)...")

        if create_slideshow_video(project_num, image_paths):
            successful += 1
        else:
            failed += 1

    print("\n" + "=" * 50)
    print("📊 Generation Complete!")
    print(f"✅ Successful: {successful}")
    print(f"❌ Failed: {failed}")
    print(f"🎬 Total videos created: {successful}")

    if successful > 0:
        print("\n🎉 New videos available in:")
        print(f"   {VIDEOS_DIR}/")
        print("\n💡 Next steps:")
        print("   1. Check video quality in browser")
        print("   2. Update VIDEO_GENERATION_STATUS.md")
        print("   3. Test on live website")

if __name__ == "__main__":
    main()
