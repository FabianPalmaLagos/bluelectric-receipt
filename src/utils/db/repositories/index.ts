import { UserRepository } from './UserRepository';
import { ReceiptRepository } from './ReceiptRepository';
import { ProjectRepository } from './ProjectRepository';
import { CategoryRepository } from './CategoryRepository';
import { CommentRepository } from './CommentRepository';

// Instancias singleton de los repositorios
const userRepository = new UserRepository();
const receiptRepository = new ReceiptRepository();
const projectRepository = new ProjectRepository();
const categoryRepository = new CategoryRepository();
const commentRepository = new CommentRepository();

// Exportar instancias singleton
export {
  userRepository,
  receiptRepository,
  projectRepository,
  categoryRepository,
  commentRepository
};

// Exportar tipos
export * from '../types';