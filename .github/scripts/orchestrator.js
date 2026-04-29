import https from 'https'

// ==========================================
// SYSTEM PROMPTS FOR ALL AGENTS
// ==========================================

const SYSTEM_PROMPTS = {
  domain: `You are a DDD Domain Expert Agent. Your role is to analyze code changes and validate them against domain-driven design principles.

## Your Focus Areas:
1. **Aggregates** - Verify proper aggregate boundaries and root entities
2. **Entities** - Check entity lifecycle, identity, and business logic placement
3. **Value Objects** - Ensure immutability and equality by value
4. **Invariants** - Validate business rules are enforced in the domain layer
5. **Domain Events** - Check proper event publishing and handling

## Input Format:
You will receive:
- DDD_SUMMARY: The domain summary with actors, entities, invariants
- README: Project overview and architecture
- DIFF: The code changes to analyze

## Output Format (JSON):
{
  "score": 0-10,
  "issues": [
    {
      "severity": "HIGH|MEDIUM|LOW",
      "category": "AGGREGATE|ENTITY|INVARIANT|LAYER_VIOLATION",
      "message": "Clear description of the issue",
      "suggestion": "How to fix it"
    }
  ],
  "summary": "Brief assessment of domain layer health"
}

## Scoring Guide:
- 10: Perfect DDD adherence
- 7-9: Minor issues, acceptable
- 4-6: Significant concerns, needs revision
- 0-3: Critical violations, must fix`,

  application: `You are a DDD Application Layer Agent. Your role is to validate use cases, application services, and orchestration logic.

## Your Focus Areas:
1. **Use Cases** - Verify proper use case boundaries and responsibilities
2. **Application Services** - Check thin services that delegate to domain
3. **DTOs** - Validate data transfer objects don't leak domain internals
4. **Transaction Boundaries** - Ensure proper unit of work handling
5. **Cross-cutting Concerns** - Validate logging, security, etc. don't pollute domain

## Input Format:
You will receive:
- DDD_SUMMARY: The domain summary
- README: Project overview
- DIFF: The code changes to analyze

## Output Format (JSON):
{
  "score": 0-10,
  "issues": [
    {
      "severity": "HIGH|MEDIUM|LOW",
      "category": "USE_CASE|SERVICE|DTO|TRANSACTION",
      "message": "Clear description of the issue",
      "suggestion": "How to fix it"
    }
  ],
  "summary": "Brief assessment of application layer health"
}

## Anti-patterns to Detect:
- Anemic Domain Model (logic in services instead of entities)
- God Services (too many responsibilities)
- Leaky Abstractions (exposing domain internals)
- Missing transaction boundaries`,

  infrastructure: `You are a DDD Infrastructure Layer Agent. Your role is to validate repositories, external integrations, and persistence concerns.

## Your Focus Areas:
1. **Repositories** - Verify proper repository pattern implementation
2. **Persistence Ignorance** - Check domain isn't polluted with ORM concerns
3. **External Services** - Validate proper anti-corruption layer usage
4. **Data Mapping** - Ensure clean separation between domain and persistence models
5. **Transaction Management** - Check proper unit of work implementation

## Input Format:
You will receive:
- DDD_SUMMARY: The domain summary
- README: Project overview
- DIFF: The code changes to analyze

## Output Format (JSON):
{
  "score": 0-10,
  "issues": [
    {
      "severity": "HIGH|MEDIUM|LOW",
      "category": "REPOSITORY|PERSISTENCE|MAPPING|EXTERNAL",
      "message": "Clear description of the issue",
      "suggestion": "How to fix it"
    }
  ],
  "summary": "Brief assessment of infrastructure layer health"
}

## Anti-patterns to Detect:
- Repository Leakage (domain logic in repositories)
- ORM Pollution (domain entities have ORM dependencies)
- Missing Repository Abstractions
- Direct DB access from domain`,

  orchestrator: `You are the DDD Review Orchestrator. Your role is to synthesize outputs from all layer agents and produce a final assessment.

## Your Task:
1. Analyze scores and issues from Domain, Application, and Infrastructure agents
2. Calculate a global score (weighted average)
3. Determine final status: PASS or FAIL
4. Generate a comprehensive markdown report

## Input Format:
You will receive:
- DOMAIN_RESULT: { score, issues, summary }
- APPLICATION_RESULT: { score, issues, summary }
- INFRASTRUCTURE_RESULT: { score, issues, summary }
- TEMPLATE: The review.md template format to follow
- README: Project context

## Decision Rules:
- **FAIL** if any HIGH severity issue exists
- **FAIL** if global score < 6
- **PASS** if no HIGH issues AND global score >= 6

## Output Format (JSON):
{
  "scores": {
    "domain": 0-10,
    "application": 0-10,
    "infrastructure": 0-10,
    "global": 0-10
  },
  "status": "PASS|FAIL",
  "criticalIssues": ["..."],
  "suggestions": ["..."],
  "markdownReport": "Full markdown report following the template"
}

## Report Template Structure:
Follow the provided TEMPLATE exactly, replacing X/10 with actual scores and filling in issues/suggestions.`
}

// ==========================================
// AGENT EXECUTION
// ==========================================

export async function runAgent(type, inputs) {
  console.log(`  🤖 Starting ${type} agent...`)

  const systemPrompt = SYSTEM_PROMPTS[type]
  const userPrompt = buildUserPrompt(type, inputs)

  const fullPrompt = `${systemPrompt}\n\n---USER INPUT---\n${userPrompt}`
  const promptLength = fullPrompt.length
  console.log(`     Prompt size: ${promptLength} chars (truncated to 60000)`)

  try {
    const promptArg = fullPrompt.substring(0, 60000)
    console.log(`     Calling Groq API...`)

    const response = await groqGenerate(promptArg)

    console.log(`     ✅ ${type} agent completed (output: ${response.length} chars)`)
    return parseAgentOutput(response, type)
  } catch (error) {
    console.error(`     ⚠️ Agent ${type} failed:`, error.message)
    console.log(`     🔄 Using default response for ${type}`)
    return getDefaultResponse(type)
  }
}

function sanitizePrompt(text) {
  // Remove control characters except common whitespace
  // eslint-disable-next-line no-control-regex
  return text
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control chars except \t, \n, \r
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width spaces
}

function groqGenerate(prompt) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      reject(new Error('GROQ_API_KEY not set in environment'))
      return
    }

    // Sanitize prompt to avoid JSON encoding issues
    const cleanPrompt = sanitizePrompt(prompt)

    const payload = {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are a DDD expert analyzing code changes. Always respond with valid JSON only.' },
        { role: 'user', content: cleanPrompt }
      ],
      temperature: 0.3,
      max_tokens: 4096
    }

    const data = JSON.stringify(payload)
    const dataLength = Buffer.byteLength(data, 'utf8')

    console.log(`     📤 Sending ${dataLength} bytes to Groq...`)

    const options = {
      hostname: 'api.groq.com',
      port: 443,
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': dataLength
      }
    }

    const req = https.request(options, (res) => {
      let body = ''
      res.on('data', (chunk) => { body += chunk })
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`))
        } else {
          try {
            const json = JSON.parse(body)
            resolve(json.choices?.[0]?.message?.content || '')
          } catch (e) {
            reject(new Error(`Invalid JSON response: ${e.message}`))
          }
        }
      })
    })

    req.on('error', (err) => reject(err))
    req.setTimeout(120000, () => {
      req.destroy()
      reject(new Error('Request timeout'))
    })

    req.write(data)
    req.end()
  })
}

function buildUserPrompt(type, inputs) {
  const { diff, dddSummary, readme, template, agentResults } = inputs
  
  switch (type) {
    case 'domain':
      return `
DDD_SUMMARY:
${dddSummary}

README:
${readme}

DIFF (Code Changes):
${diff}

Analyze the domain layer aspects of these changes.`
      
    case 'application':
      return `
DDD_SUMMARY:
${dddSummary}

README:
${readme}

DIFF (Code Changes):
${diff}

Analyze the application layer aspects of these changes.`
      
    case 'infrastructure':
      return `
DDD_SUMMARY:
${dddSummary}

README:
${readme}

DIFF (Code Changes):
${diff}

Analyze the infrastructure layer aspects of these changes.`
      
    case 'orchestrator':
      return `
TEMPLATE (Follow this format exactly):
${template}

README:
${readme}

DOMAIN_AGENT_RESULT:
${JSON.stringify(agentResults.domain, null, 2)}

APPLICATION_AGENT_RESULT:
${JSON.stringify(agentResults.application, null, 2)}

INFRASTRUCTURE_AGENT_RESULT:
${JSON.stringify(agentResults.infrastructure, null, 2)}

Generate the final report following the template.`
      
    default:
      return ''
  }
}

function parseAgentOutput(output, type = 'unknown') {
  try {
    // Try to extract JSON from the output (handle markdown code blocks)
    const jsonMatch = output.match(/```json\n?([\s\S]*?)\n?```/) || 
                      output.match(/{[\s\S]*}/)
    
    const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : output
    const result = JSON.parse(jsonStr.trim())
    console.log(`     ✅ ${type} output parsed successfully`)
    return result
  } catch (e) {
    console.error(`     ⚠️ Failed to parse ${type} agent output:`, e.message)
    console.log(`     📄 Raw output (first 200 chars): ${output.substring(0, 200)}...`)
    return { score: 5, issues: [], summary: 'Parse error - using defaults' }
  }
}

function getDefaultResponse(type) {
  return {
    score: 5,
    issues: [{
      severity: 'MEDIUM',
      category: 'AGENT_ERROR',
      message: `${type} agent failed to execute`,
      suggestion: 'Check Ollama availability and model'
    }],
    summary: `${type} analysis could not complete`
  }
}

// ==========================================
// MAIN ORCHESTRATION
// ==========================================

export async function runDDDReview(diff, dddSummary, readme, template) {
  console.log('🧠 Starting DDD Multi-Agent Review...\n')
  
  // Run layer agents in parallel
  const [domain, application, infrastructure] = await Promise.all([
    runAgent('domain', { diff, dddSummary, readme }),
    runAgent('application', { diff, dddSummary, readme }),
    runAgent('infrastructure', { diff, dddSummary, readme })
  ])
  
  console.log('📊 Domain Score:', domain.score)
  console.log('📊 Application Score:', application.score)
  console.log('📊 Infrastructure Score:', infrastructure.score)
  
  // Run orchestrator
  const orchestratorResult = await runAgent('orchestrator', {
    readme,
    template,
    agentResults: { domain, application, infrastructure }
  })
  
  // Calculate global score if not provided
  const scores = orchestratorResult.scores || {
    domain: domain.score,
    application: application.score,
    infrastructure: infrastructure.score,
    global: Math.round((domain.score + application.score + infrastructure.score) / 3)
  }
  
  // Determine status
  const hasHighIssues = [...(domain.issues || []), ...(application.issues || []), ...(infrastructure.issues || [])]
    .some(i => i.severity === 'HIGH')
  
  const status = orchestratorResult.status || (hasHighIssues || scores.global < 6 ? 'FAIL' : 'PASS')
  
  // Build result
  const result = {
    scores,
    status,
    issues: {
      domain: domain.issues || [],
      application: application.issues || [],
      infrastructure: infrastructure.issues || []
    },
    markdownReport: orchestratorResult.markdownReport || generateDefaultReport(scores, status, domain, application, infrastructure)
  }
  
  return result
}

function generateDefaultReport(scores, status, domain, application, infrastructure) {
  const allIssues = [
    ...(domain.issues || []),
    ...(application.issues || []),
    ...(infrastructure.issues || [])
  ]
  
  const criticalIssues = allIssues.filter(i => i.severity === 'HIGH')
  const suggestions = allIssues.filter(i => i.severity !== 'HIGH')
  
  return `## 🧠 DDD Review Report

### 📊 Scores
- Domain: ${scores.domain}/10
- Application: ${scores.application}/10
- Infrastructure: ${scores.infrastructure}/10
- Global: ${scores.global}/10

---

### 🚨 Critical Issues
${criticalIssues.length > 0 
  ? criticalIssues.map(i => `- **${i.category}**: ${i.message}\n  - Suggestion: ${i.suggestion}`).join('\n')
  : '- No critical issues detected'}

---

### 💡 Suggestions
${suggestions.length > 0
  ? suggestions.map(i => `- **${i.category}**: ${i.message}`).join('\n')
  : '- No suggestions'}

---

### ⚠️ Status
${status === 'PASS' ? '✅ PASS' : '❌ FAIL'}
`
}
