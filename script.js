// script.js

document.getElementById('sbhForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const capital = parseFloat(document.getElementById('capital').value);
  const supplyRate = parseFloat(document.getElementById('supplyRate').value) / 100;
  const borrowRate = parseFloat(document.getElementById('borrowRate').value) / 100;
  const healthRatio = parseFloat(document.getElementById('healthRatio').value);
  const targetProfit = parseFloat(document.getElementById('targetProfit').value) / 100 || 0;

  const maxBorrow = capital / healthRatio;
  const totalSupplied = capital + maxBorrow;
  const hedgeReserve = capital;

  const monthlySupplyYield = (totalSupplied * supplyRate) / 12;
  const monthlyBorrowCost = (maxBorrow * borrowRate) / 12;
  const monthlyNetProfit = monthlySupplyYield - monthlyBorrowCost;

  const meetsTarget = targetProfit ? (monthlyNetProfit >= capital * targetProfit) : null;

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <h2>Hasil Simulasi</h2>
    <table>
      <tr><th>Total Supply</th><td>$${totalSupplied.toFixed(2)}</td></tr>
      <tr><th>Max Borrow (HR ${healthRatio})</th><td>$${maxBorrow.toFixed(2)}</td></tr>
      <tr><th>Cadangan Hedge</th><td>$${hedgeReserve.toFixed(2)}</td></tr>
      <tr><th>Yield Supply / bulan</th><td>$${monthlySupplyYield.toFixed(2)}</td></tr>
      <tr><th>Biaya Borrow / bulan</th><td>$${monthlyBorrowCost.toFixed(2)}</td></tr>
      <tr><th>Net Profit / bulan</th><td>$${monthlyNetProfit.toFixed(2)}</td></tr>
      ${targetProfit ? `<tr><th>Penuhi Target Profit?</th><td>${meetsTarget ? '✅ Ya' : '❌ Tidak'}</td></tr>` : ''}
    </table>
    <p style="margin-top:1rem;font-style:italic;color:gray;">Catatan: Ini simulasi sederhana. Tidak memperhitungkan reward tambahan dari LP, fluktuasi harga token, atau likuidasi darurat.</p>
  `;
});
