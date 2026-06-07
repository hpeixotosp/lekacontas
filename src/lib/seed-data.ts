// Dados completos para seed do banco de dados Leka Dashboard
// Período: Fevereiro 2026 a Dezembro 2026

export interface SeedTransaction {
  date: string // YYYY-MM-DD
  description: string
  amount: number
  type: 'credit' | 'debit'
  category: string
  installment_current?: number
  installment_total?: number
}

export const seedTransactions: SeedTransaction[] = [
  // ============================================================
  // FEVEREIRO 2026
  // ============================================================
  { date: '2026-01-30', description: 'Crédito recebido', amount: 100.00, type: 'credit', category: 'Crédito' },
  { date: '2026-02-03', description: 'Crédito recebido', amount: 100.00, type: 'credit', category: 'Crédito' },
  { date: '2026-02-06', description: 'Crédito recebido', amount: 200.00, type: 'credit', category: 'Crédito' },
  { date: '2026-02-10', description: 'Parcela Cartão', amount: 320.00, type: 'debit', category: 'Cartão', installment_current: 12, installment_total: 18 },
  { date: '2026-02-15', description: 'Cartão Leka Caixa', amount: 400.00, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 1, installment_total: 3 },

  // ============================================================
  // MARÇO 2026
  // ============================================================
  { date: '2026-03-06', description: 'Crédito recebido', amount: 250.00, type: 'credit', category: 'Crédito' },
  { date: '2026-03-06', description: 'Crédito recebido', amount: 1000.00, type: 'credit', category: 'Crédito' },
  { date: '2026-03-17', description: 'Crédito recebido', amount: 150.00, type: 'credit', category: 'Crédito' },
  { date: '2026-03-25', description: 'Crédito recebido', amount: 100.00, type: 'credit', category: 'Crédito' },

  // Shopee à vista - março
  { date: '2026-03-11', description: 'SHOPEE *YUNYSHOP', amount: 51.96, type: 'debit', category: 'Shopee' },
  { date: '2026-03-16', description: 'SHOPEE *SHPSTECNOLOGIA', amount: 49.90, type: 'debit', category: 'Shopee' },
  { date: '2026-03-16', description: 'SHOPEE *MontenegroIndu', amount: 26.89, type: 'debit', category: 'Shopee' },
  { date: '2026-03-16', description: 'SHOPEE *MMNacional', amount: 53.80, type: 'debit', category: 'Shopee' },
  { date: '2026-03-16', description: 'SHOPEE *DAFUSHOP', amount: 21.99, type: 'debit', category: 'Shopee' },
  { date: '2026-03-18', description: 'SHOPEE SAO PAULO', amount: 31.98, type: 'debit', category: 'Shopee' },
  { date: '2026-03-20', description: 'SHOPEE SAO PAULO', amount: 69.90, type: 'debit', category: 'Shopee' },

  // Shopee parceladas - março
  { date: '2026-03-13', description: 'SHOPEE (Hortolandia)', amount: 53.52, type: 'debit', category: 'Shopee', installment_current: 1, installment_total: 5 },
  { date: '2026-03-18', description: 'SHOPEE *CHICN', amount: 22.48, type: 'debit', category: 'Shopee', installment_current: 1, installment_total: 2 },
  { date: '2026-03-19', description: 'SHOPEE *Esmalte', amount: 14.27, type: 'debit', category: 'Shopee', installment_current: 1, installment_total: 10 },

  // Cartão Leka Caixa - fatura março
  { date: '2026-03-05', description: 'PLATAFORMACNOUR', amount: 30.72, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 10, installment_total: 12 },
  { date: '2026-03-05', description: 'MOOZ SOLUCOE OBOTICARI', amount: 28.99, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 10, installment_total: 10 },
  { date: '2026-03-05', description: 'PERFUMARIA FLORENCE', amount: 24.98, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 6, installment_total: 6 },
  { date: '2026-03-05', description: 'EC WEPINK', amount: 44.72, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 6, installment_total: 6 },
  { date: '2026-03-05', description: 'RDSAUDE ONLINE', amount: 80.33, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 3, installment_total: 3 },
  { date: '2026-03-05', description: 'LpModa', amount: 400.00, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 3, installment_total: 5 },
  { date: '2026-03-05', description: 'MIRA MODAS', amount: 36.67, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 3, installment_total: 3 },
  { date: '2026-03-05', description: 'COMERCIAL LAM SHUI LING', amount: 27.94, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 3, installment_total: 4 },
  { date: '2026-03-05', description: 'MP TRANSFERENCIA', amount: 56.87, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 2, installment_total: 2 },

  // Parcela Cartão + Leka Caixa - março
  { date: '2026-03-10', description: 'Parcela Cartão', amount: 320.00, type: 'debit', category: 'Cartão', installment_current: 13, installment_total: 18 },
  { date: '2026-03-15', description: 'Cartão Leka Caixa', amount: 400.00, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 2, installment_total: 3 },

  // ============================================================
  // ABRIL 2026
  // ============================================================
  { date: '2026-04-06', description: 'Crédito recebido', amount: 200.00, type: 'credit', category: 'Crédito' },
  { date: '2026-04-07', description: 'Crédito recebido', amount: 250.00, type: 'credit', category: 'Crédito' },
  { date: '2026-04-08', description: 'Crédito recebido', amount: 200.00, type: 'credit', category: 'Crédito' },

  // Shopee novas - abril
  { date: '2026-04-09', description: 'SHOPEE (Hortolandia)', amount: 37.56, type: 'debit', category: 'Shopee', installment_current: 1, installment_total: 3 },
  { date: '2026-04-24', description: 'SHOPEE UnhasEst', amount: 71.08, type: 'debit', category: 'Shopee', installment_current: 1, installment_total: 12 },
  { date: '2026-04-25', description: 'Produtos Globo Cartola', amount: 5.01, type: 'debit', category: 'Shopee', installment_current: 1, installment_total: 12 },

  // Shopee parcelas de março - abril
  { date: '2026-04-13', description: 'SHOPEE (Hortolandia)', amount: 53.52, type: 'debit', category: 'Shopee', installment_current: 2, installment_total: 5 },
  { date: '2026-04-18', description: 'SHOPEE *CHICN', amount: 22.48, type: 'debit', category: 'Shopee', installment_current: 2, installment_total: 2 },
  { date: '2026-04-19', description: 'SHOPEE *Esmalte', amount: 14.27, type: 'debit', category: 'Shopee', installment_current: 2, installment_total: 10 },

  // Máquina Gabi
  { date: '2026-04-15', description: 'Máquina Gabi', amount: 57.00, type: 'debit', category: 'Máquina Gabi', installment_current: 1, installment_total: 15 },

  // Cartão Leka Caixa - abril
  { date: '2026-04-05', description: 'PLATAFORMACNOUR', amount: 30.72, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 11, installment_total: 12 },
  { date: '2026-04-05', description: 'LpModa', amount: 400.00, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 4, installment_total: 5 },
  { date: '2026-04-05', description: 'COMERCIAL LAM SHUI LING', amount: 27.94, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 4, installment_total: 4 },

  { date: '2026-04-10', description: 'Parcela Cartão', amount: 320.00, type: 'debit', category: 'Cartão', installment_current: 14, installment_total: 18 },
  { date: '2026-04-15', description: 'Cartão Leka Caixa', amount: 400.00, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 3, installment_total: 3 },

  // ============================================================
  // MAIO 2026
  // ============================================================
  { date: '2026-05-10', description: 'Crédito recebido', amount: 1000.00, type: 'credit', category: 'Crédito' },
  { date: '2026-05-13', description: 'Crédito recebido', amount: 200.00, type: 'credit', category: 'Crédito' },
  { date: '2026-05-13', description: 'Crédito recebido', amount: 200.00, type: 'credit', category: 'Crédito' },
  { date: '2026-05-24', description: 'Crédito recebido', amount: 700.00, type: 'credit', category: 'Crédito' },
  { date: '2026-05-26', description: 'Crédito recebido', amount: 150.00, type: 'credit', category: 'Crédito' },

  // Shopee novas - maio
  { date: '2026-05-16', description: 'SHOPEE DIADEMA (A)', amount: 51.32, type: 'debit', category: 'Shopee', installment_current: 1, installment_total: 12 },
  { date: '2026-05-17', description: 'SHOPEE DIADEMA (B)', amount: 56.65, type: 'debit', category: 'Shopee', installment_current: 1, installment_total: 12 },
  { date: '2026-05-19', description: 'SHOPEE DIADEMA (C)', amount: 50.99, type: 'debit', category: 'Shopee', installment_current: 1, installment_total: 8 },
  { date: '2026-05-20', description: 'SHOPEE DIADEMA (D)', amount: 53.15, type: 'debit', category: 'Shopee', installment_current: 1, installment_total: 6 },
  { date: '2026-05-21', description: 'SHOPEE SAO PAULO', amount: 23.93, type: 'debit', category: 'Shopee' },
  { date: '2026-05-25', description: 'SHOPEE SAO PAULO', amount: 129.90, type: 'debit', category: 'Shopee' },

  // Shopee parcelas continuadas - maio
  { date: '2026-05-13', description: 'SHOPEE (Hortolandia)', amount: 53.52, type: 'debit', category: 'Shopee', installment_current: 3, installment_total: 5 },
  { date: '2026-05-19', description: 'SHOPEE *Esmalte', amount: 14.27, type: 'debit', category: 'Shopee', installment_current: 3, installment_total: 10 },
  { date: '2026-05-09', description: 'SHOPEE (Hortolandia)', amount: 37.56, type: 'debit', category: 'Shopee', installment_current: 2, installment_total: 3 },
  { date: '2026-05-24', description: 'SHOPEE UnhasEst', amount: 71.08, type: 'debit', category: 'Shopee', installment_current: 2, installment_total: 12 },
  { date: '2026-05-25', description: 'Produtos Globo Cartola', amount: 5.01, type: 'debit', category: 'Shopee', installment_current: 2, installment_total: 12 },

  // Máquina Gabi
  { date: '2026-05-15', description: 'Máquina Gabi', amount: 57.00, type: 'debit', category: 'Máquina Gabi', installment_current: 2, installment_total: 15 },

  // Cartão Leka Caixa - maio (últimas)
  { date: '2026-05-05', description: 'PLATAFORMACNOUR', amount: 30.72, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 12, installment_total: 12 },
  { date: '2026-05-05', description: 'LpModa', amount: 400.00, type: 'debit', category: 'Cartão Leka Caixa', installment_current: 5, installment_total: 5 },

  { date: '2026-05-10', description: 'Parcela Cartão', amount: 320.00, type: 'debit', category: 'Cartão', installment_current: 15, installment_total: 18 },

  // ============================================================
  // JUNHO 2026
  // ============================================================
  { date: '2026-06-02', description: 'Crédito recebido', amount: 400.00, type: 'credit', category: 'Crédito' },

  // Shopee nova - junho
  { date: '2026-06-02', description: 'lpmoda DIADEMA', amount: 37.85, type: 'debit', category: 'Shopee', installment_current: 1, installment_total: 5 },

  // Shopee parcelas continuadas - junho
  { date: '2026-06-13', description: 'SHOPEE (Hortolandia)', amount: 53.52, type: 'debit', category: 'Shopee', installment_current: 4, installment_total: 5 },
  { date: '2026-06-19', description: 'SHOPEE *Esmalte', amount: 14.27, type: 'debit', category: 'Shopee', installment_current: 4, installment_total: 10 },
  { date: '2026-06-09', description: 'SHOPEE (Hortolandia)', amount: 37.56, type: 'debit', category: 'Shopee', installment_current: 3, installment_total: 3 },
  { date: '2026-06-24', description: 'SHOPEE UnhasEst', amount: 71.08, type: 'debit', category: 'Shopee', installment_current: 3, installment_total: 12 },
  { date: '2026-06-25', description: 'Produtos Globo Cartola', amount: 5.01, type: 'debit', category: 'Shopee', installment_current: 3, installment_total: 12 },
  { date: '2026-06-16', description: 'SHOPEE DIADEMA (A)', amount: 51.32, type: 'debit', category: 'Shopee', installment_current: 2, installment_total: 12 },
  { date: '2026-06-17', description: 'SHOPEE DIADEMA (B)', amount: 56.65, type: 'debit', category: 'Shopee', installment_current: 2, installment_total: 12 },
  { date: '2026-06-19', description: 'SHOPEE DIADEMA (C)', amount: 50.99, type: 'debit', category: 'Shopee', installment_current: 2, installment_total: 8 },
  { date: '2026-06-20', description: 'SHOPEE DIADEMA (D)', amount: 53.15, type: 'debit', category: 'Shopee', installment_current: 2, installment_total: 6 },

  // Máquina Gabi
  { date: '2026-06-15', description: 'Máquina Gabi', amount: 57.00, type: 'debit', category: 'Máquina Gabi', installment_current: 3, installment_total: 15 },
  { date: '2026-06-10', description: 'Parcela Cartão', amount: 320.00, type: 'debit', category: 'Cartão', installment_current: 16, installment_total: 18 },

  // ============================================================
  // JULHO 2026
  // ============================================================
  { date: '2026-07-13', description: 'SHOPEE (Hortolandia)', amount: 53.52, type: 'debit', category: 'Shopee', installment_current: 5, installment_total: 5 },
  { date: '2026-07-19', description: 'SHOPEE *Esmalte', amount: 14.27, type: 'debit', category: 'Shopee', installment_current: 5, installment_total: 10 },
  { date: '2026-07-24', description: 'SHOPEE UnhasEst', amount: 71.08, type: 'debit', category: 'Shopee', installment_current: 4, installment_total: 12 },
  { date: '2026-07-25', description: 'Produtos Globo Cartola', amount: 5.01, type: 'debit', category: 'Shopee', installment_current: 4, installment_total: 12 },
  { date: '2026-07-02', description: 'lpmoda DIADEMA', amount: 37.85, type: 'debit', category: 'Shopee', installment_current: 2, installment_total: 5 },
  { date: '2026-07-16', description: 'SHOPEE DIADEMA (A)', amount: 51.32, type: 'debit', category: 'Shopee', installment_current: 3, installment_total: 12 },
  { date: '2026-07-17', description: 'SHOPEE DIADEMA (B)', amount: 56.65, type: 'debit', category: 'Shopee', installment_current: 3, installment_total: 12 },
  { date: '2026-07-19', description: 'SHOPEE DIADEMA (C)', amount: 50.99, type: 'debit', category: 'Shopee', installment_current: 3, installment_total: 8 },
  { date: '2026-07-20', description: 'SHOPEE DIADEMA (D)', amount: 53.15, type: 'debit', category: 'Shopee', installment_current: 3, installment_total: 6 },

  { date: '2026-07-15', description: 'Máquina Gabi', amount: 57.00, type: 'debit', category: 'Máquina Gabi', installment_current: 4, installment_total: 15 },
  { date: '2026-07-10', description: 'Parcela Cartão', amount: 320.00, type: 'debit', category: 'Cartão', installment_current: 17, installment_total: 18 },

  // ============================================================
  // AGOSTO 2026
  // ============================================================
  { date: '2026-08-19', description: 'SHOPEE *Esmalte', amount: 14.27, type: 'debit', category: 'Shopee', installment_current: 6, installment_total: 10 },
  { date: '2026-08-24', description: 'SHOPEE UnhasEst', amount: 71.08, type: 'debit', category: 'Shopee', installment_current: 5, installment_total: 12 },
  { date: '2026-08-25', description: 'Produtos Globo Cartola', amount: 5.01, type: 'debit', category: 'Shopee', installment_current: 5, installment_total: 12 },
  { date: '2026-08-02', description: 'lpmoda DIADEMA', amount: 37.85, type: 'debit', category: 'Shopee', installment_current: 3, installment_total: 5 },
  { date: '2026-08-16', description: 'SHOPEE DIADEMA (A)', amount: 51.32, type: 'debit', category: 'Shopee', installment_current: 4, installment_total: 12 },
  { date: '2026-08-17', description: 'SHOPEE DIADEMA (B)', amount: 56.65, type: 'debit', category: 'Shopee', installment_current: 4, installment_total: 12 },
  { date: '2026-08-19', description: 'SHOPEE DIADEMA (C)', amount: 50.99, type: 'debit', category: 'Shopee', installment_current: 4, installment_total: 8 },
  { date: '2026-08-20', description: 'SHOPEE DIADEMA (D)', amount: 53.15, type: 'debit', category: 'Shopee', installment_current: 4, installment_total: 6 },

  { date: '2026-08-15', description: 'Máquina Gabi', amount: 57.00, type: 'debit', category: 'Máquina Gabi', installment_current: 5, installment_total: 15 },
  { date: '2026-08-10', description: 'Parcela Cartão', amount: 320.00, type: 'debit', category: 'Cartão', installment_current: 18, installment_total: 18 },

  // ============================================================
  // SETEMBRO 2026
  // ============================================================
  { date: '2026-09-19', description: 'SHOPEE *Esmalte', amount: 14.27, type: 'debit', category: 'Shopee', installment_current: 7, installment_total: 10 },
  { date: '2026-09-24', description: 'SHOPEE UnhasEst', amount: 71.08, type: 'debit', category: 'Shopee', installment_current: 6, installment_total: 12 },
  { date: '2026-09-25', description: 'Produtos Globo Cartola', amount: 5.01, type: 'debit', category: 'Shopee', installment_current: 6, installment_total: 12 },
  { date: '2026-09-02', description: 'lpmoda DIADEMA', amount: 37.85, type: 'debit', category: 'Shopee', installment_current: 4, installment_total: 5 },
  { date: '2026-09-16', description: 'SHOPEE DIADEMA (A)', amount: 51.32, type: 'debit', category: 'Shopee', installment_current: 5, installment_total: 12 },
  { date: '2026-09-17', description: 'SHOPEE DIADEMA (B)', amount: 56.65, type: 'debit', category: 'Shopee', installment_current: 5, installment_total: 12 },
  { date: '2026-09-19', description: 'SHOPEE DIADEMA (C)', amount: 50.99, type: 'debit', category: 'Shopee', installment_current: 5, installment_total: 8 },
  { date: '2026-09-20', description: 'SHOPEE DIADEMA (D)', amount: 53.15, type: 'debit', category: 'Shopee', installment_current: 5, installment_total: 6 },

  { date: '2026-09-15', description: 'Máquina Gabi', amount: 57.00, type: 'debit', category: 'Máquina Gabi', installment_current: 6, installment_total: 15 },

  // ============================================================
  // OUTUBRO 2026
  // ============================================================
  { date: '2026-10-19', description: 'SHOPEE *Esmalte', amount: 14.27, type: 'debit', category: 'Shopee', installment_current: 8, installment_total: 10 },
  { date: '2026-10-24', description: 'SHOPEE UnhasEst', amount: 71.08, type: 'debit', category: 'Shopee', installment_current: 7, installment_total: 12 },
  { date: '2026-10-25', description: 'Produtos Globo Cartola', amount: 5.01, type: 'debit', category: 'Shopee', installment_current: 7, installment_total: 12 },
  { date: '2026-10-02', description: 'lpmoda DIADEMA', amount: 37.85, type: 'debit', category: 'Shopee', installment_current: 5, installment_total: 5 },
  { date: '2026-10-16', description: 'SHOPEE DIADEMA (A)', amount: 51.32, type: 'debit', category: 'Shopee', installment_current: 6, installment_total: 12 },
  { date: '2026-10-17', description: 'SHOPEE DIADEMA (B)', amount: 56.65, type: 'debit', category: 'Shopee', installment_current: 6, installment_total: 12 },
  { date: '2026-10-19', description: 'SHOPEE DIADEMA (C)', amount: 50.99, type: 'debit', category: 'Shopee', installment_current: 6, installment_total: 8 },
  { date: '2026-10-20', description: 'SHOPEE DIADEMA (D)', amount: 53.15, type: 'debit', category: 'Shopee', installment_current: 6, installment_total: 6 },

  { date: '2026-10-15', description: 'Máquina Gabi', amount: 57.00, type: 'debit', category: 'Máquina Gabi', installment_current: 7, installment_total: 15 },

  // ============================================================
  // NOVEMBRO 2026
  // ============================================================
  { date: '2026-11-19', description: 'SHOPEE *Esmalte', amount: 14.27, type: 'debit', category: 'Shopee', installment_current: 9, installment_total: 10 },
  { date: '2026-11-24', description: 'SHOPEE UnhasEst', amount: 71.08, type: 'debit', category: 'Shopee', installment_current: 8, installment_total: 12 },
  { date: '2026-11-25', description: 'Produtos Globo Cartola', amount: 5.01, type: 'debit', category: 'Shopee', installment_current: 8, installment_total: 12 },
  { date: '2026-11-16', description: 'SHOPEE DIADEMA (A)', amount: 51.32, type: 'debit', category: 'Shopee', installment_current: 7, installment_total: 12 },
  { date: '2026-11-17', description: 'SHOPEE DIADEMA (B)', amount: 56.65, type: 'debit', category: 'Shopee', installment_current: 7, installment_total: 12 },
  { date: '2026-11-19', description: 'SHOPEE DIADEMA (C)', amount: 50.99, type: 'debit', category: 'Shopee', installment_current: 7, installment_total: 8 },

  { date: '2026-11-15', description: 'Máquina Gabi', amount: 57.00, type: 'debit', category: 'Máquina Gabi', installment_current: 8, installment_total: 15 },

  // ============================================================
  // DEZEMBRO 2026
  // ============================================================
  { date: '2026-12-19', description: 'SHOPEE *Esmalte', amount: 14.27, type: 'debit', category: 'Shopee', installment_current: 10, installment_total: 10 },
  { date: '2026-12-24', description: 'SHOPEE UnhasEst', amount: 71.08, type: 'debit', category: 'Shopee', installment_current: 9, installment_total: 12 },
  { date: '2026-12-25', description: 'Produtos Globo Cartola', amount: 5.01, type: 'debit', category: 'Shopee', installment_current: 9, installment_total: 12 },
  { date: '2026-12-16', description: 'SHOPEE DIADEMA (A)', amount: 51.32, type: 'debit', category: 'Shopee', installment_current: 8, installment_total: 12 },
  { date: '2026-12-17', description: 'SHOPEE DIADEMA (B)', amount: 56.65, type: 'debit', category: 'Shopee', installment_current: 8, installment_total: 12 },
  { date: '2026-12-19', description: 'SHOPEE DIADEMA (C)', amount: 50.99, type: 'debit', category: 'Shopee', installment_current: 8, installment_total: 8 },

  { date: '2026-12-15', description: 'Máquina Gabi', amount: 57.00, type: 'debit', category: 'Máquina Gabi', installment_current: 9, installment_total: 15 },
]
