import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import domainRouter from './routes/domain';
import keywordsRouter from './routes/keywords';
import phrasesRouter from './routes/phrases';
import aiQueriesRouter from './routes/ai-queries';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/domain', domainRouter);
app.use('/api/keywords', keywordsRouter);
app.use('/api/phrases', phrasesRouter);
app.use('/api/ai-queries', aiQueriesRouter);

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.url}`
  });
});

const PORT = Number(process.env?.PORT) || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
}); 