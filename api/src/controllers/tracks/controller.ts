import { Request, Response, NextFunction } from "express";

import { SearchParams } from "../../utils/query-builder";
import { FoundTrack } from "../../types";
import { wrapResponse } from "../../utils";
import { trackService } from "../../services/tracks";

export type GetTrackIdsByFilePathsReqBody = { filePaths: string[] };

export const tracksController = {
  findTrack: async function (
    req: Request<unknown, unknown, SearchParams>,
    res: Response<{ results: FoundTrack[] }>,
    next: NextFunction,
  ) {
    try {
      res.json(wrapResponse(await trackService.find(req.body)));
    } catch (err) {
      next(err);
    }
  },

  getTrackIdsByFilePaths: async function (
    req: Request<unknown, unknown, GetTrackIdsByFilePathsReqBody>,
    res: Response<{ results: { trackId: number; filePath: string }[] }>,
    next: NextFunction,
  ) {
    try {
      res.json(
        wrapResponse(await trackService.findIdsByFilePaths(req.body.filePaths)),
      );
    } catch (err) {
      next(err);
    }
  },
};
