import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import type { ReportData } from '@/types/report';

// Optionally register a font for nicer look (defaults are fine if unavailable)
// Font.register({ family: 'Inter', fonts: [{ src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fv.ttf' }] });

// Base64 encoded logo
const LOGO_BASE64 = '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';

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 30,
    fontSize: 11,
    color: '#2D3748',
    backgroundColor: '#FFFFFF',
    lineHeight: 1.4,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 40,
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  logo: {
    width: 80,
    height: 40,
    marginBottom: 20,
    alignSelf: 'flex-start'
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#1A202C',
    letterSpacing: -0.5
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4
  },
  reportMeta: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 16
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF'
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#4299E1'
  },
  executiveSummary: {
    backgroundColor: '#F7FAFC',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4299E1'
  },
  scoreDisplay: {
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2B6CB0',
    marginBottom: 4
  },
  scoreLabel: {
    fontSize: 12,
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  metricsGrid: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    marginTop: 20
  },
  metricCard: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  metricLabel: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748'
  },
  performanceCard: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12
  },
  performanceHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  performanceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748'
  },
  performanceScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2B6CB0'
  },
  progressContainer: {
    backgroundColor: '#EDF2F7',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8
  },
  progressBar: {
    height: '100%',
    borderRadius: 4
  },
  weightText: {
    fontSize: 10,
    color: '#A0AEC0'
  },
  // Professional table styles
  tableContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F7FAFC',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0'
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: '#FFFFFF'
  },
  tableRowAlt: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: '#FAFAFA'
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#4A5568',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  tableCell: {
    flex: 1,
    fontSize: 11,
    color: '#2D3748'
  },
  // Status badges with better hierarchy
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'flex-start'
  },
  statusHigh: {
    backgroundColor: '#FED7D7',
    color: '#C53030'
  },
  statusMedium: {
    backgroundColor: '#FEEBC8',
    color: '#DD6B20'
  },
  statusLow: {
    backgroundColor: '#C6F6D5',
    color: '#2F855A'
  },
  statusGood: {
    backgroundColor: '#BEE3F8',
    color: '#2B6CB0'
  },
  // Competitor analysis
  competitorSection: {
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20
  },
  competitorCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12
  },
  competitorRank: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2B6CB0',
    marginRight: 12
  },
  competitorName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4
  },
  competitorMeta: {
    fontSize: 10,
    color: '#718096'
  },
  // Insights and recommendations
  insightBox: {
    backgroundColor: '#EBF8FF',
    borderLeftWidth: 4,
    borderLeftColor: '#4299E1',
    padding: 16,
    borderRadius: 6,
    marginBottom: 12
  },
  warningBox: {
    backgroundColor: '#FFFAF0',
    borderLeftWidth: 4,
    borderLeftColor: '#ED8936',
    padding: 16,
    borderRadius: 6,
    marginBottom: 12
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16
  },
  recommendationHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  priorityIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 16
  },
  priorityHigh: {
    backgroundColor: '#E53E3E'
  },
  priorityMedium: {
    backgroundColor: '#DD6B20'
  },
  priorityLow: {
    backgroundColor: '#38A169'
  },
  recommendationContent: {
    flex: 1
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 6
  },
  recommendationDesc: {
    fontSize: 12,
    color: '#4A5568',
    lineHeight: 1.4,
    marginBottom: 8
  },
  impactText: {
    fontSize: 11,
    color: '#2B6CB0',
    fontWeight: '500'
  },
  // Summary stats
  summaryGrid: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginBottom: 24
  },
  summaryCard: {
    flex: 1,
    textAlign: 'center',
    padding: 16,
    backgroundColor: '#F7FAFC',
    borderRadius: 8
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B6CB0',
    marginBottom: 4
  },
  summaryLabel: {
    fontSize: 11,
    color: '#718096',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  // Query analysis
  queryCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16
  },
  queryHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  queryNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3748'
  },
  modelTag: {
    backgroundColor: '#EBF8FF',
    color: '#2B6CB0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    fontSize: 10,
    fontWeight: '600'
  },
  queryText: {
    fontSize: 12,
    color: '#4A5568',
    backgroundColor: '#F7FAFC',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16
  },
  metricsRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16
  },
  metricBox: {
    flex: 1,
    textAlign: 'center',
    padding: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 4
  },
  metricNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 2
  },
  metricName: {
    fontSize: 9,
    color: '#718096',
    textTransform: 'uppercase'
  }
});

interface ReportPDFProps {
  reportData: ReportData;
}

export default function ReportPDF({ reportData }: ReportPDFProps) {
  const domain = reportData.domain.url;
  const genDate = new Date().toLocaleDateString();

  const scoreBreakdownEntries = Object.entries(reportData.scoreBreakdown);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image 
            style={styles.logo}
            src={`data:image/png;base64,${LOGO_BASE64}`}
          />
          <Text style={styles.title}>Domain Performance Analysis</Text>
          <Text style={styles.subtitle}>Comprehensive AI visibility assessment for {domain}</Text>
          <Text style={styles.reportMeta}>Generated on {genDate} • Confidential Report</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.executiveSummary}>
            <View style={styles.summaryGrid}>
              <View style={styles.scoreDisplay}>
                <Text style={styles.scoreValue}>{Math.min(Math.max(reportData.overallScore, 0), 100)}</Text>
                <Text style={styles.scoreLabel}>Overall Score</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricLabel}>Domain</Text>
                <Text style={styles.metricValue}>{reportData.domain.context}</Text>
                <Text style={[styles.metricLabel, { marginTop: 8 }]}>Analysis Scope</Text>
                <Text style={styles.metricValue}>{reportData.selectedKeywords.length} keywords</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance</Text>
          {scoreBreakdownEntries.map(([key, item], index) => {
            const getScoreColor = (score: number) => {
              if (score >= 80) return '#38A169';
              if (score >= 60) return '#DD6B20';
              return '#E53E3E';
            };
            
            return (
              <View key={key} style={styles.performanceCard}>
                <View style={styles.performanceHeader}>
                  <Text style={styles.performanceTitle}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
                  </Text>
                  <Text style={styles.performanceScore}>{Math.min(Math.max(item.score, 0), 100)}/100</Text>
                </View>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { 
                    width: `${Math.min(Math.max(item.score, 0), 100)}%`,
                    backgroundColor: getScoreColor(Math.min(Math.max(item.score, 0), 100))
                  }]} />
                </View>
                <Text style={styles.weightText}>Weight: {item.weight}% of total score</Text>
              </View>
            );
          })}
        </View>

        {reportData.additionalInsights && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Competitors</Text>
            
            <View style={styles.competitorSection}>
              <Text style={[styles.performanceTitle, { marginBottom: 16 }]}>
                Top Performing Competitors
              </Text>
              {(reportData.additionalInsights.topCompetitors || []).slice(0, 5).map((c, idx) => (
                <View key={idx} style={styles.competitorCard}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.competitorRank}>#{idx + 1}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.competitorName}>{c.domain}</Text>
                      {c.name && <Text style={styles.competitorMeta}>{c.name} • {c.frequency} mentions</Text>}
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Model Performance Summary */}
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell}>AI Model</Text>
                <Text style={styles.tableHeaderCell}>Performance</Text>
                <Text style={styles.tableHeaderCell}>Presence Rate</Text>
                <Text style={styles.tableHeaderCell}>Status</Text>
              </View>
              {(reportData.additionalInsights.modelInsights || []).map((m, idx) => (
                <View key={idx} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                  <Text style={styles.tableCell}>{m.model}</Text>
                  <Text style={styles.tableCell}>{Math.min(Math.max(m.avgScore, 0), 100)}/100</Text>
                  <Text style={styles.tableCell}>{Math.min(Math.max(m.presenceRate, 0), 100)}%</Text>
                  <Text style={[styles.statusBadge, 
                    m.avgScore >= 80 ? styles.statusGood :
                    m.avgScore >= 60 ? styles.statusMedium : styles.statusHigh
                  ]}>
                    {m.avgScore >= 80 ? 'Excellent' : m.avgScore >= 60 ? 'Good' : 'Needs Attention'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {reportData.intentPhrases && reportData.intentPhrases.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Intent Phrases</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Phrase</Text>
              <Text style={styles.tableHeaderCell}>Relevance</Text>
              <Text style={styles.tableHeaderCell}>Trend</Text>
              <Text style={styles.tableHeaderCell}>Parent Keyword</Text>
              <Text style={styles.tableHeaderCell}>Sources</Text>
            </View>
            {reportData.intentPhrases.slice(0, 20).map((p, idx) => {
              const getRelevanceBadge = (relevance: number) => {
                if (relevance >= 80) return styles.statusGood;
                if (relevance >= 60) return styles.statusMedium;
                return styles.statusHigh;
              };
              
              return (
                <View key={p.id} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                  <Text style={[styles.tableCell, { fontSize: 9 }]}>{p.phrase}</Text>
                  <Text style={[styles.tableCell, getRelevanceBadge(p.relevance)]}>{Math.min(Math.max(p.relevance, 0), 100)}/100</Text>
                  <Text style={styles.tableCell}>{p.trend}</Text>
                  <Text style={[styles.tableCell, { fontSize: 9, color: '#718096' }]}>{p.parentKeyword}</Text>
                  <Text style={[styles.tableCell, { fontSize: 9, color: '#718096' }]}>{(p.sources || []).slice(0, 2).join(', ')}</Text>
                </View>
              );
            })}
            {reportData.intentPhrases.length > 20 && (
              <Text style={[{ fontSize: 9, color: '#718096' }, { marginTop: 8, textAlign: 'center', fontStyle: 'italic' }]}>
                Showing top 20 intent phrases. Total: {reportData.intentPhrases.length}
              </Text>
            )}
          </View>
        )}

        {reportData.llmResults && reportData.llmResults.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI Performance</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Model</Text>
              <Text style={styles.tableHeaderCell}>Avg Confidence</Text>
              <Text style={styles.tableHeaderCell}>Responses</Text>
              <Text style={styles.tableHeaderCell}>Top Source</Text>
            </View>
            {reportData.llmResults.map((r, idx) => {
              const getConfidenceBadge = (confidence: number) => {
                if (confidence >= 0.8) return styles.statusGood;
                if (confidence >= 0.6) return styles.statusMedium;
                return styles.statusHigh;
              };
              
              return (
                <View key={idx} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                  <Text style={styles.tableCell}>{r.model}</Text>
                  <Text style={[styles.tableCell, getConfidenceBadge(r.avgConfidence)]}>
                    {Math.min(Math.max(Math.round(r.avgConfidence * 100), 0), 100)}%
                  </Text>
                  <Text style={styles.tableCell}>{r.responses}</Text>
                  <Text style={[styles.tableCell, { fontSize: 9, color: '#718096' }]}>{r.topSource}</Text>
                </View>
              );
            })}
          </View>
        )}

        {/* Detailed Query Results */}
        {reportData.aiResults && reportData.aiResults.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Query Details</Text>
            {reportData.aiResults.slice(0, 6).map((res, idx) => (
              <View key={`${res.model}-${idx}`} style={styles.queryCard}>
                <View style={styles.queryHeader}>
                  <Text style={styles.queryNumber}>Query #{idx + 1}</Text>
                  <Text style={styles.modelTag}>{res.model}</Text>
                </View>

                <Text style={styles.queryText}>{res.phrase}</Text>

                <View style={styles.metricsRow}>
                  <View style={styles.metricBox}>
                    <Text style={[styles.metricNumber, { 
                      color: Number(res.scores.presence) > 0.5 ? '#38A169' : '#E53E3E'
                    }]}>
                      {Math.min(Math.max(Math.round(Number(res.scores.presence) * 100), 0), 100)}%
                    </Text>
                    <Text style={styles.metricName}>Presence</Text>
                  </View>
                  <View style={styles.metricBox}>
                    <Text style={styles.metricNumber}>
                      {res.scores.domainRank || '—'}
                    </Text>
                    <Text style={styles.metricName}>Rank</Text>
                  </View>
                  <View style={styles.metricBox}>
                    <Text style={[styles.metricNumber, { 
                      color: Number(res.scores.aiConfidence || 0) > 0.7 ? '#38A169' : '#DD6B20'
                    }]}>
                      {Math.min(Math.max(Math.round(Number(res.scores.aiConfidence || 0) * 100), 0), 100)}%
                    </Text>
                    <Text style={styles.metricName}>Confidence</Text>
                  </View>
                  <View style={styles.metricBox}>
                    <Text style={styles.metricNumber}>${Number(res.cost).toFixed(4)}</Text>
                    <Text style={styles.metricName}>Cost</Text>
                  </View>
                </View>

                {res.scores.competitors?.mentions && res.scores.competitors.mentions.length > 0 && (
                  <View style={styles.insightBox}>
                    <Text style={[styles.metricLabel, { color: '#2B6CB0', marginBottom: 8 }]}>
                      Competitor Analysis ({res.scores.competitors.totalMentions} total mentions)
                    </Text>
                    {res.scores.competitors.mentions.slice(0, 2).map((mention, mIdx) => (
                      <Text key={mIdx} style={styles.competitorMeta}>
                        • {mention.name} (Position {mention.position}) - {mention.sentiment} sentiment
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Selected Keywords Analysis */}
        {reportData.selectedKeywords && reportData.selectedKeywords.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Keywords</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Keyword</Text>
              <Text style={styles.tableHeaderCell}>Volume</Text>
              <Text style={styles.tableHeaderCell}>Difficulty</Text>
              <Text style={styles.tableHeaderCell}>CPC</Text>
              <Text style={styles.tableHeaderCell}>Status</Text>
            </View>
            {reportData.selectedKeywords.slice(0, 10).map((keyword, idx) => (
              <View key={keyword.id} style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                <Text style={styles.tableCell}>{keyword.keyword}</Text>
                <Text style={styles.tableCell}>{keyword.volume.toLocaleString()}</Text>
                <Text style={[styles.tableCell, 
                  keyword.difficulty === 'Easy' ? { color: '#059669' } :
                  keyword.difficulty === 'Medium' ? { color: '#D97706' } : { color: '#DC2626' }
                ]}>{keyword.difficulty}</Text>
                <Text style={styles.tableCell}>${keyword.cpc.toFixed(2)}</Text>
                <Text style={[styles.tableCell, keyword.isSelected ? styles.statusGood : styles.statusHigh]}>
                  {keyword.isSelected ? 'Selected' : 'Not Selected'}
                </Text>
              </View>
            ))}
            {reportData.selectedKeywords.length > 10 && (
              <Text style={[{ fontSize: 9, color: '#718096' }, { marginTop: 8, textAlign: 'center', fontStyle: 'italic' }]}>
                Showing top 10 keywords. Total: {reportData.selectedKeywords.length}
              </Text>
            )}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {(reportData.recommendations || []).slice(0, 6).map((rec, idx) => {
            const getPriorityColor = (priority: string) => {
              if (priority.toLowerCase().includes('high')) return styles.priorityHigh;
              if (priority.toLowerCase().includes('medium')) return styles.priorityMedium;
              return styles.priorityLow;
            };
            
            return (
              <View key={idx} style={styles.recommendationCard}>
                <View style={styles.recommendationHeader}>
                  <View style={[styles.priorityIndicator, getPriorityColor(rec.priority)]} />
                  <View style={styles.recommendationContent}>
                    <Text style={styles.recommendationTitle}>{rec.type}</Text>
                    <Text style={styles.recommendationDesc}>{rec.description}</Text>
                    <Text style={styles.impactText}>Expected Impact: {rec.impact}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
} 