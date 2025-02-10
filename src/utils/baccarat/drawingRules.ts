export function shouldPlayerDraw(value: number): boolean {
  // プレイヤーは0-5の場合のみ3枚目を引く
  // 6-7の場合は引かない（8-9はナチュラルで既に処理済み）
  return value >= 0 && value <= 5;
}

export function shouldBankerDraw(
  bankerValue: number,
  playerThirdCard?: number
): boolean {
  // 1. バンカーが7以上の場合は絶対に引かない
  if (bankerValue >= 7) return false;
  
  // 2. バンカーが0,1,2の場合は必ず引く
  if (bankerValue <= 2) return true;

  // 3. プレイヤーが3枚目を引かなかった場合
  if (playerThirdCard === undefined) {
    return bankerValue <= 5;  // バンカーは5以下なら引く
  }

  // 4. プレイヤーの3枚目の値によってバンカーの引くルールが変わる
  switch (bankerValue) {
    case 3:  // バンカーが3の場合、プレイヤーの3枚目が8以外なら引く
      return playerThirdCard !== 8;
    case 4:  // バンカーが4の場合、プレイヤーの3枚目が2-7なら引く
      return playerThirdCard >= 2 && playerThirdCard <= 7;
    case 5:  // バンカーが5の場合、プレイヤーの3枚目が4-7なら引く
      return playerThirdCard >= 4 && playerThirdCard <= 7;
    case 6:  // バンカーが6の場合、プレイヤーの3枚目が6,7なら引く
      return playerThirdCard === 6 || playerThirdCard === 7;
    default:
      return false;
  }
}