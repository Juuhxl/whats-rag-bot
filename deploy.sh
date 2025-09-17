#!/bin/bash

# Deployment script for GCP
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Iniciando deploy do RAG Prompt Generator no GCP...${NC}"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ Google Cloud CLI não está instalado. Instale em: https://cloud.google.com/sdk/docs/install${NC}"
    exit 1
fi

# Check if project is set
PROJECT_ID=$(gcloud config get-value project)
if [ -z "$PROJECT_ID" ]; then
    echo -e "${RED}❌ Projeto GCP não configurado. Execute: gcloud config set project YOUR_PROJECT_ID${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Projeto GCP: $PROJECT_ID${NC}"

# Enable required APIs
echo -e "${YELLOW}📋 Habilitando APIs necessárias...${NC}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Build and deploy using Cloud Build
echo -e "${YELLOW}🔨 Construindo e fazendo deploy da aplicação...${NC}"
gcloud builds submit --config cloudbuild.yaml .

# Get the deployed URL
SERVICE_URL=$(gcloud run services describe rag-prompt-generator --region=southamerica-east1 --format="value(status.url)")

echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
echo -e "${GREEN}🌐 Aplicação disponível em: $SERVICE_URL${NC}"
echo -e "${YELLOW}📊 Para monitorar: https://console.cloud.google.com/run/detail/southamerica-east1/rag-prompt-generator${NC}"

# Optional: Open the deployed app
read -p "Deseja abrir a aplicação no navegador? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    open "$SERVICE_URL" || xdg-open "$SERVICE_URL" || echo "Abra manualmente: $SERVICE_URL"
fi