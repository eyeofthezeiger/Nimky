export type RootStackParamList = {
    Starting: undefined;
    Game: {
        playerOneName: string;
        playerTwoName: string;
    };
    GameOver: {
        playerOneName: string;
        playerTwoName: string;
        playerOnePoints: number;
        playerTwoPoints: number;
        points: number;
    };
  };
  