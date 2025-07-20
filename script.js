document.getElementById('btcForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const capital = parseFloat(document.getElementById('capital').value);
  const priceNow = parseFloat(document.getElementById('btcPriceNow').value);
  const priceFuture = parseFloat(document.getElementById('btcPriceFuture').value);
  const supplyApr = parseFloat(document.getElementById('supplyApr').value) / 100;
  const borrowApr = parseFloat(document.getElementById('borrowApr').value) / 100;
  const lpApr = parseFloat(document.getElementById('lpApr').value) / 100 || 0;

  const supplyAmount = (2 / 3) * capital;
  const borrowAmount = (1 / 3) * capital;

  const supplyYield = (supplyAmount * supplyApr) / 12;
  const borrowCost = (borrowAmount * borrowApr) / 12;
  const lpYield = (borrowAmount * lpApr) / 12;

  const btcGain = ((priceFuture - priceNow) / priceNow) * supplyAmount;

  const netProfit = supplyYield + lpYield - borrowCost + btcGain;

  document.getElementById('result').innerHTML = `
    <h2>Hasil Simulasi</h2>
    <table>
      <tr><th>Total Modal</th><td>$${capital.toFixed(2)}</td></tr>
      <tr><th>Supply BTC (2/3)</th><td>$${supplyAmount.toFixed(2)}</td></tr>
      <tr><th>Borrow USDC (1/3)</th><td>$${borrowAmount.toFixed(2)}</td></tr>
      <tr><th>Yield Supply / bulan</th><td>$${supplyYield.toFixed(2)}</td></tr>
      <tr><th>Yield LP Farming / bulan</th><td>$${lpYield.toFixed(2)}</td></tr>
      <tr><th>Biaya Pinjam / bulan</th><td>$${borrowCost.toFixed(2)}</td></tr>
      <tr><th>Keuntungan dari Naiknya BTC</th><td>$${btcGain.toFixed(2)}</td></tr>
      <tr><th><strong>Net Profit (1 bulan)</strong></th><td><strong>$${netProfit.toFixed(2)}</strong></td></tr>
    </table>
    <p style="font-style:italic;color:gray;">Simulasi ini mengasumsikan harga BTC naik sesuai prediksi. Risiko pasar dan likuidasi tidak diperhitungkan.</p>
  `;
});
