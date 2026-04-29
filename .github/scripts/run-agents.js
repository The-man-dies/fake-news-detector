import fs from 'fs'
import { execSync } from 'child_process'
import { runDDDReview } from './orchestrator.js'

// ==========================================
// LOAD INPUTS
// ==========================================

// Diff PR - use GITHUB_BASE_REF for compatibility
const baseRef = process.env.GITHUB_BASE_REF || 'main'
const diff = execSync(`git diff origin/${baseRef}`).toString()

// Focused context (only ddd-summary.md, not all doc/)
const dddSummary = fs.readFileSync('doc/ddd-summary.md', 'utf-8')
const readme = fs.readFileSync('README.md', 'utf-8')
const template = fs.readFileSync('.github/templates/review.md', 'utf-8')

// ==========================================
// RUN DDD REVIEW
// ==========================================

const result = await runDDDReview(diff, dddSummary, readme, template)

// ==========================================
// SAVE OUTPUTS
// ==========================================

fs.writeFileSync('result.json', JSON.stringify({
  scores: result.scores,
  status: result.status,
  issues: result.issues
}, null, 2))

fs.writeFileSync('review.md', result.markdownReport)

console.log('\n✅ DDD Review complete!')
console.log(`Status: ${result.status}`)
console.log(`Global Score: ${result.scores.global}/10`)
