import { Request, Response, NextFunction } from 'express';
import { extractVisitorContext } from '../../utils/visitorContext';
import { analyticsService } from './analytics.service';

export class AnalyticsController {
  async trackPageView(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const visitor = extractVisitorContext(req);
      const pageView = await analyticsService.trackPageView(req.body, visitor);
      res.status(201).json(pageView);
    } catch (err) {
      next(err);
    }
  }

  async summary(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const summary = await analyticsService.getSummary();
      res.json(summary);
    } catch (err) {
      next(err);
    }
  }
}

export const analyticsController = new AnalyticsController();
