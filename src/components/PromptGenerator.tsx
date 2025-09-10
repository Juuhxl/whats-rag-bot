import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, MessageSquare, Database, Cloud, Settings, Download, Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProjectConfig {
  projectName: string;
  clientName: string;
  description: string;
  techStack: {
    backend: string[];
    frontend: string[];
    database: string[];
    deployment: string[];
  };
  features: {
    ragArchitecture: boolean;
    whatsappIntegration: boolean;
    adminDashboard: boolean;
    fileUpload: boolean;
    analytics: boolean;
    multiLanguage: boolean;
  };
  aiModel: string;
  vectorDatabase: string;
  whatsappProvider: string;
  additionalRequirements: string;
}

const PromptGenerator = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<ProjectConfig>({
    projectName: "",
    clientName: "",
    description: "",
    techStack: {
      backend: ["Node.js", "TypeScript", "Express"],
      frontend: ["React", "TypeScript", "Vite"],
      database: ["PostgreSQL", "Redis"],
      deployment: ["Docker", "AWS"]
    },
    features: {
      ragArchitecture: true,
      whatsappIntegration: true,
      adminDashboard: true,
      fileUpload: true,
      analytics: false,
      multiLanguage: false
    },
    aiModel: "gpt-4-turbo",
    vectorDatabase: "Pinecone",
    whatsappProvider: "WhatsApp Cloud API",
    additionalRequirements: ""
  });

  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const generatePrompt = () => {
    const prompt = `# Prompt Técnico Detalhado: Chatbot RAG para WhatsApp

## 1. Visão Geral do Projeto
**Nome do Projeto:** ${config.projectName}
**Cliente:** ${config.clientName}
**Descrição:** ${config.description}

Desenvolver um chatbot de atendimento ao cliente para WhatsApp utilizando arquitetura RAG (Retrieval-Augmented Generation) com integração completa entre backend, frontend e serviços de IA.

## 2. Arquitetura Técnica

### 2.1 Stack Tecnológico
**Backend:** ${config.techStack.backend.join(", ")}
**Frontend:** ${config.techStack.frontend.join(", ")}
**Banco de Dados:** ${config.techStack.database.join(", ")}
**Deploy:** ${config.techStack.deployment.join(", ")}
**IA:** ${config.aiModel}
**Banco Vetorial:** ${config.vectorDatabase}
**WhatsApp:** ${config.whatsappProvider}

### 2.2 Arquitetura RAG (Retrieval-Augmented Generation)

#### Componentes Principais:
1. **Document Ingestion Pipeline**
   - Suporte para arquivos .pdf, .docx, .json, .txt
   - Processamento de texto e chunking inteligente
   - Geração de embeddings usando OpenAI API
   - Armazenamento no banco vetorial ${config.vectorDatabase}

2. **Retrieval System**
   - Busca de similaridade semântica
   - Ranking e filtragem de resultados
   - Context window optimization
   - Fallback para respostas genéricas

3. **Generation Layer**
   - Integração com ${config.aiModel}
   - Prompt engineering otimizado
   - Context injection dinâmico
   - Response validation e filtering

## 3. Backend Requirements (Node.js + TypeScript)

### 3.1 Estrutura de Pastas
\`\`\`
src/
├── controllers/
│   ├── whatsapp.controller.ts
│   ├── documents.controller.ts
│   ├── chat.controller.ts
│   └── admin.controller.ts
├── services/
│   ├── rag.service.ts
│   ├── openai.service.ts
│   ├── vector.service.ts
│   └── whatsapp.service.ts
├── models/
│   ├── conversation.model.ts
│   ├── document.model.ts
│   └── user.model.ts
├── middleware/
│   ├── auth.middleware.ts
│   ├── validation.middleware.ts
│   └── rateLimit.middleware.ts
├── utils/
│   ├── embedding.util.ts
│   ├── chunking.util.ts
│   └── logger.util.ts
└── routes/
    ├── api.routes.ts
    └── webhook.routes.ts
\`\`\`

### 3.2 Endpoints Principais

#### WhatsApp Integration
- \`POST /webhook/whatsapp\` - Receber mensagens
- \`GET /webhook/whatsapp\` - Verificação do webhook
- \`POST /api/whatsapp/send\` - Enviar mensagens

#### RAG System
- \`POST /api/documents/upload\` - Upload de documentos
- \`DELETE /api/documents/:id\` - Remover documento
- \`GET /api/documents\` - Listar documentos
- \`POST /api/documents/sync\` - Sincronizar base de conhecimento

#### Chat Management
- \`POST /api/chat/query\` - Processar consulta RAG
- \`GET /api/conversations\` - Listar conversas
- \`GET /api/conversations/:id\` - Detalhes da conversa

### 3.3 Fluxo RAG Detalhado
1. **Recepção da Mensagem**
   - Webhook do WhatsApp recebe mensagem
   - Validação e sanitização da entrada
   - Identificação do usuário e contexto

2. **Processamento RAG**
   - Geração de embedding da query
   - Busca vetorial no ${config.vectorDatabase}
   - Seleção dos top-k documentos relevantes
   - Montagem do contexto enriquecido

3. **Geração da Resposta**
   - Construção do prompt com contexto
   - Chamada para ${config.aiModel}
   - Pós-processamento da resposta
   - Validação de qualidade

4. **Envio da Resposta**
   - Formatação para WhatsApp
   - Envio via ${config.whatsappProvider}
   - Logging e analytics

## 4. Frontend Requirements (React + TypeScript)

### 4.1 Componentes Principais
${config.features.adminDashboard ? `
#### Dashboard Administrativo
- **Login/Autenticação**
  - Sistema de login seguro
  - Gerenciamento de sessões
  - Recuperação de senha

- **Overview Dashboard**
  - Métricas em tempo real
  - Gráficos de conversas
  - Status do sistema
  - Performance do RAG
` : ""}

${config.features.fileUpload ? `
#### Gerenciamento de Documentos
- **Upload Interface**
  - Drag & drop para arquivos
  - Preview de documentos
  - Barra de progresso
  - Validação de tipos

- **Document Library**
  - Lista de documentos carregados
  - Funcionalidade de busca
  - Edição de metadados
  - Controle de versões
` : ""}

#### Monitoramento de Conversas
- **Chat History**
  - Timeline de conversas
  - Busca por usuário/data
  - Análise de sentimento
  - Export de dados

- **Real-time Monitoring**
  - Conversas ativas
  - Tempo de resposta
  - Taxa de resolução
  - Feedback dos usuários

#### Configurações do Sistema
- **Bot Configuration**
  - Personalização do bot
  - Templates de resposta
  - Configuração de fallbacks
  - Ajuste de parâmetros RAG

${config.features.analytics ? `
#### Analytics Dashboard
- **Performance Metrics**
  - Tempo de resposta médio
  - Accuracy do RAG
  - Satisfação do usuário
  - Volume de mensagens

- **Business Intelligence**
  - Relatórios customizados
  - Tendências de uso
  - ROI do chatbot
  - Insights de melhoria
` : ""}

### 4.2 Tecnologias Frontend
- **UI Framework:** React 18+ com TypeScript
- **State Management:** Zustand ou Redux Toolkit
- **UI Components:** shadcn/ui + Tailwind CSS
- **Charts:** Recharts ou Chart.js
- **Forms:** React Hook Form + Zod validation
- **HTTP Client:** Axios com interceptors
- **Real-time:** Socket.io para updates em tempo real

## 5. Integrações e APIs

### 5.1 OpenAI Integration
\`\`\`typescript
interface OpenAIService {
  generateEmbedding(text: string): Promise<number[]>;
  generateResponse(prompt: string, context: string[]): Promise<string>;
  validateResponse(response: string): boolean;
}
\`\`\`

### 5.2 Vector Database (${config.vectorDatabase})
\`\`\`typescript
interface VectorService {
  indexDocument(id: string, embedding: number[], metadata: object): Promise<void>;
  searchSimilar(queryEmbedding: number[], topK: number): Promise<SearchResult[]>;
  deleteDocument(id: string): Promise<void>;
  updateDocument(id: string, embedding: number[], metadata: object): Promise<void>;
}
\`\`\`

### 5.3 WhatsApp Integration (${config.whatsappProvider})
\`\`\`typescript
interface WhatsAppService {
  sendMessage(to: string, message: string): Promise<void>;
  sendTemplateMessage(to: string, templateName: string, params: object): Promise<void>;
  verifyWebhook(token: string): boolean;
  processIncomingMessage(payload: object): Promise<void>;
}
\`\`\`

## 6. Segurança e Compliance

### 6.1 Autenticação e Autorização
- JWT tokens com refresh mechanism
- Role-based access control (RBAC)
- API rate limiting
- CORS configuration

### 6.2 Proteção de Dados
- Criptografia de dados sensíveis
- Sanitização de entrada
- Validation schemas
- Audit logging

### 6.3 WhatsApp Security
- Webhook signature verification
- Token rotation
- Message encryption
- User data privacy

## 7. Performance e Escalabilidade

### 7.1 Otimizações
- Redis caching para consultas frequentes
- Connection pooling para banco de dados
- Lazy loading no frontend
- Image optimization
- Bundle splitting

### 7.2 Monitoramento
- Application Performance Monitoring (APM)
- Error tracking com Sentry
- Logs estruturados
- Health checks

### 7.3 Escalabilidade
- Horizontal scaling com load balancers
- Database sharding se necessário
- CDN para assets estáticos
- Auto-scaling groups

## 8. Deployment e DevOps

### 8.1 Containerização
\`\`\`dockerfile
# Dockerfile para backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### 8.2 CI/CD Pipeline
- GitHub Actions ou GitLab CI
- Automated testing
- Code quality checks
- Security scanning
- Automated deployment

### 8.3 Infrastructure as Code
- Terraform ou CloudFormation
- Environment management
- Secret management
- Backup strategies

${config.features.multiLanguage ? `
## 9. Internacionalização
- Multi-language support
- Dynamic content translation
- Locale-specific responses
- Cultural adaptation
` : ""}

## 10. Testing Strategy

### 10.1 Backend Testing
- Unit tests com Jest
- Integration tests
- API endpoint testing
- RAG accuracy testing

### 10.2 Frontend Testing
- Component testing com React Testing Library
- E2E testing com Playwright
- Visual regression testing
- Accessibility testing

## 11. Entregáveis

### 11.1 Documentação
- Architecture documentation
- API documentation (Swagger/OpenAPI)
- User manual
- Deployment guide
- Troubleshooting guide

### 11.2 Código
- Backend application
- Frontend application
- Database migrations
- Docker configurations
- CI/CD pipelines

### 11.3 Infraestrutura
- Production-ready deployment
- Monitoring setup
- Backup procedures
- Security configurations

${config.additionalRequirements ? `
## 12. Requisitos Adicionais
${config.additionalRequirements}
` : ""}

## 13. Timeline e Milestones

### Fase 1: Setup e Infraestrutura (Semana 1-2)
- Configuração do ambiente de desenvolvimento
- Setup da infraestrutura básica
- Integração inicial com APIs

### Fase 2: Backend RAG (Semana 3-4)
- Implementação do sistema RAG
- Integração com banco vetorial
- Testes de performance

### Fase 3: WhatsApp Integration (Semana 5)
- Implementação dos webhooks
- Fluxo completo de mensagens
- Testes de integração

### Fase 4: Frontend Dashboard (Semana 6-7)
- Interface administrativa
- Gerenciamento de documentos
- Monitoramento em tempo real

### Fase 5: Testing e Deployment (Semana 8)
- Testes completos
- Deploy em produção
- Monitoramento e ajustes

---

**Objetivo:** Criar uma solução completa, escalável e robusta para atendimento automatizado via WhatsApp com capacidades avançadas de IA e recuperação de informações.`;

    setGeneratedPrompt(prompt);
    toast({
      title: "Prompt gerado!",
      description: "Prompt técnico detalhado criado com sucesso.",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Copiado!",
      description: "Prompt copiado para a área de transferência.",
    });
  };

  const downloadPrompt = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.projectName || 'chatbot-rag'}-prompt-tecnico.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado!",
      description: "Arquivo markdown baixado com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Gerador de Prompts RAG
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Crie prompts técnicos detalhados para desenvolvimento de chatbots WhatsApp com arquitetura RAG
          </p>
        </div>

        <Tabs defaultValue="config" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="config" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuração
            </TabsTrigger>
            <TabsTrigger value="prompt" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Prompt Gerado
            </TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-subtle hover:shadow-elegant transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Informações do Projeto
                  </CardTitle>
                  <CardDescription>
                    Configure os detalhes básicos do seu projeto
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="projectName">Nome do Projeto</Label>
                    <Input
                      id="projectName"
                      value={config.projectName}
                      onChange={(e) => setConfig(prev => ({...prev, projectName: e.target.value}))}
                      placeholder="Ex: ChatBot Atendimento Empresa X"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientName">Cliente</Label>
                    <Input
                      id="clientName"
                      value={config.clientName}
                      onChange={(e) => setConfig(prev => ({...prev, clientName: e.target.value}))}
                      placeholder="Ex: Empresa XYZ Ltda"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Descrição do Projeto</Label>
                    <Textarea
                      id="description"
                      value={config.description}
                      onChange={(e) => setConfig(prev => ({...prev, description: e.target.value}))}
                      placeholder="Descreva o objetivo e escopo do chatbot..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-subtle hover:shadow-elegant transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Configurações Técnicas
                  </CardTitle>
                  <CardDescription>
                    Selecione as tecnologias e integrações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="aiModel">Modelo de IA</Label>
                    <Select value={config.aiModel} onValueChange={(value) => setConfig(prev => ({...prev, aiModel: value}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude-3">Claude 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="vectorDatabase">Banco Vetorial</Label>
                    <Select value={config.vectorDatabase} onValueChange={(value) => setConfig(prev => ({...prev, vectorDatabase: value}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pinecone">Pinecone</SelectItem>
                        <SelectItem value="Weaviate">Weaviate</SelectItem>
                        <SelectItem value="Milvus">Milvus</SelectItem>
                        <SelectItem value="Chroma">Chroma</SelectItem>
                        <SelectItem value="Qdrant">Qdrant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="whatsappProvider">Provedor WhatsApp</Label>
                    <Select value={config.whatsappProvider} onValueChange={(value) => setConfig(prev => ({...prev, whatsappProvider: value}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WhatsApp Cloud API">WhatsApp Cloud API</SelectItem>
                        <SelectItem value="Twilio">Twilio</SelectItem>
                        <SelectItem value="360dialog">360dialog</SelectItem>
                        <SelectItem value="ChatAPI">ChatAPI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-subtle">
              <CardHeader>
                <CardTitle>Funcionalidades</CardTitle>
                <CardDescription>
                  Selecione as funcionalidades que devem ser incluídas no projeto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(config.features).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) => 
                          setConfig(prev => ({
                            ...prev, 
                            features: {...prev.features, [key]: checked}
                          }))
                        }
                      />
                      <Label htmlFor={key} className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-subtle">
              <CardHeader>
                <CardTitle>Requisitos Adicionais</CardTitle>
                <CardDescription>
                  Descreva requisitos específicos ou funcionalidades customizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={config.additionalRequirements}
                  onChange={(e) => setConfig(prev => ({...prev, additionalRequirements: e.target.value}))}
                  placeholder="Ex: Integração com CRM específico, relatórios customizados, compliance LGPD..."
                  rows={4}
                />
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button 
                onClick={generatePrompt} 
                size="lg"
                className="bg-gradient-primary hover:shadow-elegant transition-all duration-300"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Gerar Prompt Técnico
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="prompt" className="space-y-6">
            {generatedPrompt ? (
              <Card className="shadow-subtle">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-success" />
                        Prompt Técnico Gerado
                      </CardTitle>
                      <CardDescription>
                        Prompt completo pronto para uso no desenvolvimento
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={copyToClipboard} variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar
                      </Button>
                      <Button onClick={downloadPrompt} variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg max-h-96 overflow-y-auto">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {generatedPrompt}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-subtle">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum prompt gerado ainda</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Configure seu projeto na aba "Configuração" e clique em "Gerar Prompt Técnico"
                  </p>
                  <Button variant="outline" onClick={() => setConfig(prev => prev)}>
                    Ir para Configuração
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PromptGenerator;