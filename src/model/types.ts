export type DemoScenario = 'stable' | 'growth' | 'attention'

export type Classification =
  | 'BUSINESS_REVENUE'
  | 'BUSINESS_EXPENSE'
  | 'PERSONAL_REVENUE'
  | 'PERSONAL_EXPENSE'
  | 'PERSONAL_TRANSFER'
  | 'TAX_PAYMENT'
  | 'LOAN_RECEIVED'
  | 'LOAN_PAYMENT'
  | 'SUPPLIER_PAYMENT'
  | 'REFUND'
  | 'UNKNOWN'

export interface ClassifiedTransaction {
  id: string
  transactionDate: string
  amount: number
  description: string
  category: string
  accountType: 'PF' | 'PJ'
  classification: Classification
  confidenceScore: number
  isBusinessTransaction: boolean
  classifierSource: 'RULE' | 'ML' | 'HYBRID'
  explanation: string
  needsReview: boolean
}

export interface TransferMatch {
  debitTransactionId: string
  creditTransactionId: string
  debitAccountId: string
  creditAccountId: string
  amount: number
  feeAmount: number
  confidence: number
  status: 'CONFIRMED' | 'NEEDS_REVIEW'
  reason: string
}

export interface RefundLink {
  refundTransactionId: string
  originalTransactionId: string
  amount: number
  confidence: number
  reason: string
}

export interface RawTransaction {
  id: string
  userId: string
  accountId: string
  accountType: 'PF' | 'PJ'
  transactionDate: string
  amount: number
  description: string
  type?: 'CREDIT' | 'DEBIT'
  category?: string
  source: string
  documentNumber?: string
  merchantName?: string
}

export interface AnalysisInput {
  cnpj: string
  companyName?: string
  scenario?: DemoScenario
  transactions?: RawTransaction[]
}

export interface PipelineStep {
  id: 'INGESTION' | 'NORMALIZATION' | 'CLASSIFICATION' | 'RECONCILIATION' | 'REPORTING' | 'SCORING'
  label: string
  status: 'COMPLETED'
  records: number
  durationMs: number
  detail: string
}

export interface PipelineProgressEvent {
  step: PipelineStep
  stepIndex: number
  completedSteps: number
  totalSteps: number
  aiEvidence?: {
    modelName: string
    modelVersion: string
    algorithm: string
    averageConfidence: number
    sourceCounts: {
      ml: number
      rule: number
      hybrid: number
    }
  }
}

export interface MonthlyCashFlow {
  month: string
  revenue: number
  businessExpenses: number
  personalRevenue: number
  personalExpenses: number
  businessCashFlow: number
  internalTransfers: number
  loanProceeds: number
  financingPayments: number
  pendingReviewAmount: number
  consolidatedAccountFlow: number
}

export interface CreditAnalysis {
  schemaVersion: '1.0.0'
  analysisId: string
  generatedAt: string
  scenario: DemoScenario
  dataOrigin: 'SYNTHETIC' | 'CLIENT_PROVIDED' | 'OPEN_FINANCE'
  decisionMode: 'ADVISORY'
  versions: {
    model: string
    dataset: string
    datasetFingerprint: string
    rules: string
    creditPolicy: string
  }
  trace: {
    requestId: string | null
    inputHash: string | null
    pipelineDurationMs: number
  }
  company: {
    cnpj: string
    companyName: string
    tradeName: string
    companySize: string
    mainActivity: string
    city: string
    state: string
    source: 'BRASIL_API' | 'DEMO_PROFILE' | 'PROVIDED_PROFILE'
  }
  model: {
    name: string
    version: string
    datasetVersion: string
    datasetFingerprint: string
    evaluationTarget: 'NAIVE_BAYES' | 'HYBRID_PIPELINE'
    algorithm: string
    trainedAt: string
    trainingSamples: number
    validationSamples: number
    accuracy: number
    macroF1: number
    labels: number
    perClass: Array<{
      label: Classification
      support: number
      precision: number
      recall: number
      f1Score: number
    }>
  }
  modelMonitoring: {
    averageConfidence: number
    lowConfidenceRate: number
    unknownRate: number
    rulesCoverageRate: number
  }
  dataQuality: {
    status: 'SUFFICIENT' | 'INSUFFICIENT'
    observationMonths: number
    transactionCount: number
    revenueMonths: number
    minimumObservationMonths: number
    minimumTransactions: number
    issues: string[]
  }
  pipeline: PipelineStep[]
  transactions: ClassifiedTransaction[]
  transferMatches: TransferMatch[]
  refundLinks: RefundLink[]
  report: {
    businessRevenue: number
    businessExpenses: number
    personalRevenue: number
    personalExpenses: number
    businessCashFlow: number
    internalTransfers: number
    loanProceeds: number
    financingPayments: number
    pendingReviewAmount: number
    consolidatedAccountFlow: number
    availableCashFlow: number
    averageMonthlyRevenue: number
    recurringRevenueRate: number
    stabilityScore: number
    estimatedPaymentCapacity: number
    creditScore: number
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
    rating: 'A' | 'B' | 'C' | 'D'
    suggestedLimit: number
    recommendation: 'APPROVE' | 'MANUAL_REVIEW' | 'DECLINE'
    businessTransactionShare: number
    monthlyCashFlow: MonthlyCashFlow[]
    positiveFactors: string[]
    attentionPoints: string[]
  }
  integrations: Record<
    'database' | 'rabbitmq' | 'companyApi',
    {
      status: 'CONNECTED' | 'DEGRADED' | 'SKIPPED'
      detail: string
    }
  >
}

export type AnalystDecisionValue = 'APPROVED' | 'DECLINED' | 'NEEDS_INFORMATION'

export interface AnalystDecision {
  id: string
  decision: AnalystDecisionValue
  justification: string
  decidedBy: string
  createdAt: string
}

export interface AnalysisReview {
  analysisId: string
  status: 'PENDING' | 'IN_REVIEW' | 'DECIDED'
  currentDecision: AnalystDecision | null
  history: AnalystDecision[]
  feedbackCount: number
}

export interface TransactionFeedback {
  id: string
  analysisId: string
  transactionId: string
  originalClassification: Classification
  correctedClassification: Classification
  reason: string
  submittedBy: string
  status: 'APPROVED' | 'REJECTED'
  createdAt: string
}
