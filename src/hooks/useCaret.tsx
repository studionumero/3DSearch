const useCaret = (start: number, end: number, updateCaret: { (): void; (): void; }) => {


  // Some side effect in the `onChange` handler (could be anything)
  console.log('start:', start);
  console.log('end :', end)

  updateCaret();

  // switch (true) {
  //   case (e.keyCode == 37):
  //   case (e.keyCode == 39): {
  //     updateCaret();
  //   }
  //     break;
  //   default:
  //     return;
  // }
};

export { useCaret }