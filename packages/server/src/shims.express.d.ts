import { Router } from 'express';

declare module 'express' {
  export interface Router {
    comment?: (comment: string) => Router;
  }
}
