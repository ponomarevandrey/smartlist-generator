import React from "react";
import { FaDownload } from "react-icons/fa";

import type { LibPathInput } from "../../../types";
import { exportValidationReport, getRTKQueryErr } from "../../../utils";
import { Loader } from "../../ui/loader/loader-component";
import { Process as SSEMessage } from "../../ui/process";
import {
  useStreamSSEsQuery,
  useStartProcessMutation,
  useStopProcessMutation,
} from "../../api";
import { Message } from "../../ui/message";

interface ValidationSettingsProps extends React.HTMLAttributes<HTMLElement> {
  currentSettings: LibPathInput;
}

export function ValidationSettings(props: ValidationSettingsProps) {
  const sseStream = useStreamSSEsQuery("validation");
  const [startProc, startProcResult] = useStartProcessMutation();
  const [stopProc, stopProcResult] = useStopProcessMutation();

  const latestMsg = Array.isArray(sseStream.data)
    ? sseStream.data[sseStream.data.length - 1]
    : null;

  return (
    <section className="settings-page__subsection">
      <div className="settings-page__row">
        <header className="settings-page__header">Files Validation</header>
        <div className="settings-page__column">
          {latestMsg && (
            <SSEMessage
              details={latestMsg}
              className={`status-loader status-loader_${latestMsg.status}`}
            >
              <button
                type="button"
                onClick={() => exportValidationReport(latestMsg.result)}
                className="btn btn_type_secondary"
              >
                <FaDownload className="icon" /> Download report
              </button>
            </SSEMessage>
          )}

          <button
            type="button"
            className="btn btn_type_secondary"
            onClick={
              latestMsg?.status === "pending"
                ? () => stopProc({ processName: "validation" })
                : () =>
                    startProc({
                      processName: "validation",
                      libPath: props.currentSettings.libPath,
                    })
            }
          >
            {latestMsg?.status === "pending" && (
              <Loader className="settings-page__btn-loader" />
            )}
            {latestMsg?.status === "pending" ? "Stop" : "Validate"}
          </button>
        </div>
      </div>
      {sseStream.error && (
        <Message type="danger">{getRTKQueryErr(sseStream.error)}</Message>
      )}
      {startProcResult.error && (
        <Message type="danger">{getRTKQueryErr(startProcResult.error)}</Message>
      )}
      {stopProcResult.error && (
        <Message type="danger">{getRTKQueryErr(stopProcResult.error)}</Message>
      )}
    </section>
  );
}