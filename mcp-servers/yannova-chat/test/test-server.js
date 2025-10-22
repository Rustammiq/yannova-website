#!/usr/bin/env node

// Simple test script for the Yannova Chat MCP Server
// This simulates MCP client communication

const { spawn } = require('child_process');
const path = require('path');

class McpClient {
  constructor() {
    this.server = spawn('node', [path.join(__dirname, '..', 'dist', 'index.js')], {
      stdio: ['pipe', 'pipe', 'inherit']
    });

    this.messageId = 1;
    this.pendingRequests = new Map();

    this.server.stdout.on('data', (data) => {
      try {
        const messages = data.toString().split('\n').filter(line => line.trim());
        messages.forEach(message => {
          const response = JSON.parse(message);
          this.handleResponse(response);
        });
      } catch (error) {
        console.log('Raw output:', data.toString());
      }
    });

    this.server.on('error', (error) => {
      console.error('Server error:', error);
    });
  }

  sendRequest(method, params = {}) {
    const request = {
      jsonrpc: '2.0',
      id: this.messageId++,
      method,
      params
    };

    this.pendingRequests.set(request.id, { method, resolve: null, reject: null });
    this.server.stdin.write(JSON.stringify(request) + '\n');

    return new Promise((resolve, reject) => {
      this.pendingRequests.get(request.id).resolve = resolve;
      this.pendingRequests.get(request.id).reject = reject;
    });
  }

  handleResponse(response) {
    const pending = this.pendingRequests.get(response.id);
    if (pending) {
      this.pendingRequests.delete(response.id);
      if (response.error) {
        pending.reject(new Error(response.error.message));
      } else {
        pending.resolve(response.result);
      }
    }
  }

  async initialize() {
    try {
      await this.sendRequest('initialize', {
        protocolVersion: '2024-11-05',
        capabilities: {
          sampling: {},
          tools: {}
        },
        clientInfo: {
          name: 'yannova-test-client',
          version: '1.0.0'
        }
      });

      await this.sendRequest('initialized');
      console.log('✅ Server initialized successfully');
    } catch (error) {
      console.error('❌ Initialization failed:', error.message);
    }
  }

  async testTools() {
    console.log('\n🛠️ Testing Tools...');

    try {
      // Test get_services tool
      console.log('Testing get_services...');
      const servicesResult = await this.sendRequest('tools/call', {
        name: 'get_services',
        arguments: {}
      });
      console.log('✅ Services:', servicesResult.content[0].text);

      // Test get_projects tool
      console.log('\nTesting get_projects...');
      const projectsResult = await this.sendRequest('tools/call', {
        name: 'get_projects',
        arguments: {}
      });
      console.log('✅ Projects:', projectsResult.content[0].text);

      // Test chat tool
      console.log('\nTesting chat...');
      const chatResult = await this.sendRequest('tools/call', {
        name: 'chat',
        arguments: {
          message: 'Hallo, ik wil informatie over nieuwbouw in Vlaanderen'
        }
      });
      console.log('✅ Chat response:', chatResult.content[0].text);

    } catch (error) {
      console.error('❌ Tool test failed:', error.message);
    }
  }

  async testResources() {
    console.log('\n📚 Testing Resources...');

    try {
      // List resources
      console.log('Listing resources...');
      const listResult = await this.sendRequest('resources/list');
      console.log('✅ Available resources:', listResult.resources.map(r => r.name));

      // Read services resource
      console.log('\nReading services resource...');
      const servicesResource = await this.sendRequest('resources/read', {
        uri: 'yannova://services'
      });
      console.log('✅ Services data:', servicesResource.contents[0].text);

    } catch (error) {
      console.error('❌ Resource test failed:', error.message);
    }
  }

  async testProjectIdeas() {
    console.log('\n💡 Testing Project Ideas Generator...');

    try {
      const ideasResult = await this.sendRequest('tools/call', {
        name: 'generate_project_ideas',
        arguments: {
          type: 'renovatie',
          budget: '€25.000 - €35.000',
          location: 'Keerbergen'
        }
      });
      console.log('✅ Project ideas:', ideasResult.content[0].text);
    } catch (error) {
      console.error('❌ Project ideas test failed:', error.message);
    }
  }

  close() {
    this.server.kill();
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting Yannova Chat MCP Server Tests...\n');

  const client = new McpClient();

  try {
    await client.initialize();
    await client.testTools();
    await client.testResources();
    await client.testProjectIdeas();

    console.log('\n🎉 All tests completed!');
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
  } finally {
    client.close();
  }
}

runTests();
