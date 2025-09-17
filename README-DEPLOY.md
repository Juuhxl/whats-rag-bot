# 🚀 Guia de Deploy - RAG Prompt Generator

Este guia contém instruções detalhadas para fazer deploy da aplicação no Google Cloud Platform (GCP).

## 📋 Pré-requisitos

1. **Google Cloud CLI** instalado
   ```bash
   curl https://sdk.cloud.google.com | bash
   exec -l $SHELL
   gcloud init
   ```

2. **Docker** instalado (opcional, para testes locais)

3. **Projeto GCP** configurado
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   gcloud auth login
   ```

## 🛠️ Opções de Deploy

### Opção 1: Cloud Run (Recomendado)

**Vantagens:**
- Serverless, paga apenas pelo uso
- Auto-scaling automático
- HTTPS nativo
- Fácil configuração

**Deploy:**
```bash
# Executar script automatizado
chmod +x deploy.sh
./deploy.sh
```

**Ou manualmente:**
```bash
# Habilitar APIs
gcloud services enable cloudbuild.googleapis.com run.googleapis.com

# Build e Deploy
gcloud builds submit --config cloudbuild.yaml .
```

### Opção 2: App Engine

**Vantagens:**
- Totalmente gerenciado
- Integração nativa com outros serviços GCP
- Versioning automático

**Deploy:**
```bash
gcloud app deploy app.yaml
```

### Opção 3: Compute Engine + Docker

**Vantagens:**
- Controle total sobre a infraestrutura
- Ideal para workloads customizadas

**Setup:**
```bash
# Criar instância
gcloud compute instances create rag-prompt-vm \
  --zone=southamerica-east1-a \
  --machine-type=e2-micro \
  --image-family=cos-stable \
  --image-project=cos-cloud

# Deploy via SSH
gcloud compute ssh rag-prompt-vm --zone=southamerica-east1-a
```

## 🔧 Configurações Importantes

### Variáveis de Ambiente
```bash
# Definir no Cloud Run/App Engine
VITE_SUPABASE_URL=https://nmrdmrifljueujqbjugh.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NODE_ENV=production
```

### Domínio Customizado
```bash
# Mapear domínio (Cloud Run)
gcloud run domain-mappings create \
  --service rag-prompt-generator \
  --domain yourdomain.com \
  --region southamerica-east1
```

## 📊 Monitoramento

### Logs
```bash
# Cloud Run
gcloud run logs read rag-prompt-generator --region=southamerica-east1

# App Engine
gcloud app logs tail -s default
```

### Métricas
- **Cloud Console:** https://console.cloud.google.com/monitoring
- **Uptime Monitoring:** Configure alertas para disponibilidade
- **Error Reporting:** Monitoramento automático de erros

## 🔒 Segurança

### Configurações Aplicadas
- ✅ HTTPS obrigatório
- ✅ Headers de segurança (CSP, X-Frame-Options, etc.)
- ✅ Compressão Gzip
- ✅ Cache otimizado para assets estáticos
- ✅ Health checks configurados

### IAM e Permissões
```bash
# Criar service account para CI/CD
gcloud iam service-accounts create rag-prompt-deployer

# Conceder permissões necessárias
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:rag-prompt-deployer@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.developer"
```

## 🚀 CI/CD

### GitHub Actions (Opcional)
```yaml
# .github/workflows/deploy.yml
name: Deploy to GCP
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: google-github-actions/setup-gcloud@v0
        with:
          service_account_key: ${{ secrets.GCP_SA_KEY }}
          project_id: ${{ secrets.GCP_PROJECT_ID }}
      - run: gcloud builds submit --config cloudbuild.yaml .
```

## 📈 Performance

### Otimizações Implementadas
- **Bundle Splitting:** Separação de vendor e código da aplicação
- **Tree Shaking:** Remoção de código não utilizado
- **Minificação:** Compressão do código JavaScript/CSS
- **Lazy Loading:** Carregamento sob demanda de componentes
- **Caching:** Cache inteligente de assets estáticos

### Métricas Esperadas
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Lighthouse Score:** 90+

## 💰 Custos Estimados

### Cloud Run (Uso Moderado)
- **Requests:** 100k/mês = ~$0.40
- **CPU Time:** 180k vCPU-seconds = ~$1.60
- **Memory:** 360k GiB-seconds = ~$0.16
- **Total:** ~$2.16/mês

### App Engine (F2 Instance)
- **Instance Hours:** 730h/mês = ~$20.28
- **Total:** ~$20.28/mês

## 🆘 Troubleshooting

### Problemas Comuns

1. **Build Failed**
   ```bash
   # Verificar logs
   gcloud builds log BUILD_ID
   ```

2. **Service Not Accessible**
   ```bash
   # Verificar permissões
   gcloud run services get-iam-policy rag-prompt-generator --region=southamerica-east1
   ```

3. **High Memory Usage**
   ```bash
   # Aumentar limite de memória
   gcloud run services update rag-prompt-generator \
     --memory=1Gi --region=southamerica-east1
   ```

## 📞 Suporte

- **Documentação GCP:** https://cloud.google.com/docs
- **Community Support:** https://stackoverflow.com/questions/tagged/google-cloud-platform
- **Status Page:** https://status.cloud.google.com/

---

✨ **Aplicação pronta para produção no GCP!**