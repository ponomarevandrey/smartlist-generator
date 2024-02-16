import React from "react";
import { APIResponse, GetStatsRes } from "../../types";
import { Stats } from "../stats/stats";

import "./sidebar.scss";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: {
    years: APIResponse<GetStatsRes>;
    genres: APIResponse<GetStatsRes>;
  };
}

export function Sidebar(props: SidebarProps) {
  return (
    <div className={`sidebar ${props.className || ""}`}>
      <ul className="sidebar__general-stats">
        <li className="sidebar__row">
          <span className="sidebar__stats sidebar__stats_name">
            Database created on {new Date().toDateString()}
          </span>
        </li>
        <li className="sidebar__row">
          <span className="sidebar__stats sidebar__stats_name">
            Total tracks
          </span>
          <span className="sidebar__stats sidebar__stats_value">
            {props.stats.years.response?.body?.results.reduce(
              (accumulator, currentValue) => accumulator + currentValue.count,
              0
            )}
          </span>
        </li>
      </ul>

      <Stats title="Genres" stats={props.stats.genres} />
      <Stats title="Years" stats={props.stats.years} />

      <div className="btn btn_theme_transparent-black sidebar__btn">
        Reset db
      </div>
    </div>
  );
}
