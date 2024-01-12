import React from "react";
import { TrackMeta } from "../../types";

import "./track.scss";

interface TrackProps {
  meta: TrackMeta;
}

function Track(props: TrackProps) {
  return (
    <div className="track">
      <span className="track__year">{props.meta.year}</span>
      <span className="track__artist">{props.meta.artist}</span>
      <span className="track__title">{props.meta.title}</span>
      <span className="track__playback">Play buttons</span>
      <span className="track__length">{props.meta.length}</span>
    </div>
  );
}

export { Track };
