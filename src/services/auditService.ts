import { collection, doc, getDocs, setDoc, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { AuditLog } from '../types';

const COLLECTION_NAME = 'auditLogs';

export async function logAudit(
  action: string,
  entityType: string,
  details: string,
  performedBy: string,
  entityId?: string
): Promise<void> {
  const logId = 'log-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
  const now = new Date().toISOString();

  const logDoc: Record<string, unknown> = {
    action,
    entityType,
    details,
    performedBy,
    timestamp: now,
  };
  if (entityId) {
    logDoc.entityId = entityId;
  }

  try {
    await setDoc(doc(db, COLLECTION_NAME, logId), logDoc);
  } catch (error) {
    // Non-blocking for audit log failure, but log to console
    console.warn('Audit logging failed:', error);
  }
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME));
    const snapshot = await getDocs(q);
    const logs: AuditLog[] = [];
    snapshot.forEach((snap) => {
      logs.push({ id: snap.id, ...(snap.data() as Omit<AuditLog, 'id'>) });
    });
    logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return logs;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
  }
}
