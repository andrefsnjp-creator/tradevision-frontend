import React, { useState } from 'react';
import { Upload, Brain, BarChart3, CheckCircle, Loader2, Youtube } from 'lucide-react';

// SUA URL DO BACKEND AQUI!
const API_BASE = 'https://tradevision-backend-production.up.railway.app';

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState('https://www.youtube.com/watch?v=ZiTWAtR_cQg');
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const analyzeVideo = async () => {
    if (!youtubeUrl.trim()) {
      alert('Por favor, insira uma URL do YouTube');
      return;
    }

    setAnalyzing(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch(`${API_BASE}/analyze-youtube-free`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: youtubeUrl })
      });

      const data = await response.json();
      
      if (data.success) {
        setReport(data.report);
      } else {
        setError(data.error || 'Erro na análise');
      }
    } catch (err) {
      setError('Erro de conexão: ' + err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const testConnection = async () => {
    try {
      const response = await fetch(`${API_BASE}/health`);
      const data = await response.json();
      alert(`✅ Backend conectado!\n${data.message}`);
    } catch (err) {
      alert(`❌ Erro de conexão:\n${err.message}`);
    }
  };

  const formatPips = (pips) => {
    const color = pips > 0 ? 'text-green-400' : 'text-red-400';
    const sign = pips > 0 ? '+' : '';
    return <span className={color}>{sign}{pips} pips</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-emerald-400" />
            <h1 className="text-5xl font-black text-white">
              Trade<span className="text-emerald-400">Vision</span> AI
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            Primeira IA do mundo que analisa vídeos de traders e extrai insights precisos
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-500/30">
              🚀 Sistema Online - 100% Gratuito
            </div>
            <button 
              onClick={testConnection}
              className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold border border-blue-500/30 hover:bg-blue-500/30 transition-all"
            >
              🔌 Testar Conexão
            </button>
          </div>
        </div>

        {/* YouTube Analysis */}
        {!report && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Youtube className="w-6 h-6 text-red-400" />
                Análise de Vídeo do YouTube
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    URL do YouTube:
                  </label>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-emerald-400 focus:outline-none"
                    disabled={analyzing}
                  />
                </div>
                
                <button
                  onClick={analyzeVideo}
                  disabled={analyzing}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-3"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Analisando com IA...
                    </>
                  ) : (
                    <>
                      <Brain className="w-6 h-6" />
                      Analisar com IA Gratuita
                    </>
                  )}
                </button>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mt-4">
                    <div className="text-red-400 font-semibold">❌ Erro:</div>
                    <div className="text-red-300 mt-1">{error}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Analysis Report */}
        {report && (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Success Banner */}
            <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-6 text-center">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-emerald-400 mb-2">✅ Análise Concluída!</h2>
              <p className="text-gray-300">Sistema funcionando perfeitamente!</p>
            </div>

            {/* Report Summary */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-emerald-400" />
                Resumo da Análise
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400">{report.summary?.totalTrades || 0}</div>
                  <div className="text-sm text-gray-300">Total Trades</div>
                </div>
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">{report.summary?.winRate || 0}%</div>
                  <div className="text-sm text-gray-300">Taxa Acerto</div>
                </div>
                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{formatPips(report.summary?.totalPips || 0)}</div>
                  <div className="text-sm text-gray-300">P&L Total</div>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">{formatPips(report.summary?.biggestWin || 0)}</div>
                  <div className="text-sm text-gray-300">Maior Ganho</div>
                </div>
              </div>
            </div>

            {/* Trades List */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">📊 Operações Detectadas</h3>
              
              <div className="space-y-4">
                {(report.trades || []).map((trade, index) => (
                  <div key={trade.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-emerald-400">#{index + 1}</div>
                        <div>
                          <div className="text-lg font-semibold text-white">
                            {trade.type} {trade.pair}
                          </div>
                          <div className="text-sm text-gray-400">
                            ⏰ {trade.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        trade.result === 'WIN' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {trade.result}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-400">📈 Entrada</div>
                        <div className="text-lg font-semibold text-white">{trade.entry}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">📉 Saída</div>
                        <div className="text-lg font-semibold text-white">{trade.exit}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">💰 Resultado</div>
                        <div className="text-lg font-semibold">{formatPips(trade.pips)}</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-2">💬 Justificativa:</div>
                      <div className="text-white italic">"{trade.justification}"</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Brain className="w-6 h-6 text-emerald-400" />
                Insights da IA
              </h3>
              
              <div className="space-y-3">
                {(report.insights || []).map((insight, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-white">{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <div className="text-center">
              <button 
                onClick={() => setReport(null)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition-all"
              >
                🔄 Analisar Outro Vídeo
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p className="mb-2">🚀 TradeVision AI - Sistema Completo Online</p>
          <p className="text-sm">Backend + Frontend funcionando 100% grátis</p>
        </div>
      </div>
    </div>
  );
}

export default App;
