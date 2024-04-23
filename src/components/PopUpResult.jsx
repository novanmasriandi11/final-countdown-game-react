import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const PopUpResult = forwardRef(function PopUpResult(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const playerLose = remainingTime <= 0;
  const formatRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {playerLose && <h2>You Lose</h2>}
      {!playerLose && <h2>You Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime}</strong> seconds.
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formatRemainingTime} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default PopUpResult;
