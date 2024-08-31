
enum Direction {
    Up,
    Back,
    Down,
    Left,
    Right,
  }
  
  const Direction2 = {
    Up: 0,
    Back: 1,
    Down: 2,
    Left: 3,
    Right: 4,
    0: "Up",
    1: "Back",
    2: "Down",
    3: "Left",
    4: "Right",
  };
  
  enum Dimension {
    Width = "width",
    Height = "height",
  }
  
  const Dimension2 = {
    Width: "width",
    Height: "height",
  };
  
  const enum PaymentStrategy {
    Card,
    Easypaisa,
    Cash,
  }
  
  type ExtractObjectValue<Obj extends object> = Obj[keyof Obj]
  
  const PaymentStrategy2 =  {
    Card: 1,
    Easypaisa: 2,
    Cash: 3,
  } as const;
  
  let inputPayment!: PaymentStrategy
  // let inputPayment!: typeof PaymentStrategy2[keyof typeof PaymentStrategy2]
  // let inputPayment!: ExtractObjectValue<typeof PaymentStrategy2>
  
  switch (inputPayment) {
    case PaymentStrategy.Cash:
      // Do cash
      break;
    case PaymentStrategy.Card:
      // Show card input
      break;
    case PaymentStrategy.Easypaisa:
      // Link to easypaisa
      break;
  }
  