import { useState, useMemo } from 'react';
import { Search, X, Moon, Sun, Copy, Download } from 'lucide-react';
import Snowfall from 'react-snowfall';

export default function FlorkMemBank() {
  const [search, setSearch] = useState('');
  const [isDark, setIsDark] = useState(true);
  const [copied, setCopied] = useState(null);
  const [enlarged, setEnlarged] = useState(null);

  // Configuration des polices (change facilement ici)
  const FONT_FAMILY = "'Space Mono', monospace";

  // Base de données de mèmes avec keywords
  const memes = [
    { id: 1, name: '1.jpg', keywords: ['funny', 'full', 'nourriture', 'repas'] },
    { id: 2, name: '2.jpg', keywords: ['cookie', 'greedy', 'nourriture', 'gouter'] },
    { id: 3, name: '3.jpg', keywords: ['sommeil', 'matin', 'coffee', 'tired'] },
    { id: 4, name: '4.jpg', keywords: ['love', 'calin', 'ensemble', 'partage'] },
    { id: 5, name: '5.jpg', keywords: ['yeah', 'dance', 'youpi', 'fête'] },
    { id: 6, name: '6.jpg', keywords: ['patting', 'affection', 'caresse'] },
    { id: 7, name: '7.jpg', keywords: ['phone', 'talking', 'téléphone', 'raconter'] },
    { id: 8, name: '8.jpg', keywords: ['stay', 'dont go', 'retenir', 'reste'] },
    { id: 9, name: '9.jpg', keywords: ['awkward', 'tension', 'gêne'] },
    { id: 10, name: '10.jpg', keywords: ['thinking', 'realization', 'réflexion', 'prise de conscience'] },
    { id: 11, name: '11.jpg', keywords: ['nutella', 'happiness', 'bonheur'] },
    { id: 12, name: '12.jpg', keywords: ['holding', 'cat', 'tenir', 'chat'] },
    { id: 13, name: '13.jpg', keywords: ['angry', 'annoyed', 'énervé', 'fâché'] },
    { id: 14, name: '14.jpg', keywords: ['food', 'greedy', 'nourriture', 'gourmand'] },
    { id: 15, name: '15.jpg', keywords: ['bored', 'boredom', 'ennuyé', 'ennui'] },
    { id: 16, name: '16.jpg', keywords: ['love', 'affection', 'amour'] },
    { id: 17, name: '17.jpg', keywords: ['comfort', 'support', 'réconfort', 'soutien'] },
    { id: 18, name: '18.jpg', keywords: ['despair', 'overwhelmed', 'désespoir', 'submergé'] },
    { id: 19, name: '19.jpg', keywords: ['size', 'comparison', 'taille', 'comparaison'] },
    { id: 20, name: '20.jpg', keywords: ['bandage', 'healing', 'pansement', 'guérison'] },
    { id: 21, name: '21.jpg', keywords: ['heart', 'love', 'cœur', 'amour'] },
    { id: 22, name: '22.jpg', keywords: ['holding', 'cherishing', 'tenir', 'chérir'] },
    { id: 23, name: '23.jpg', keywords: ['anxiety', 'stress', 'anxiété'] },
    { id: 24, name: '24.jpg', keywords: ['emergency', 'crisis', 'urgence', 'crise'] },
    { id: 25, name: '25.jpg', keywords: ['danger', 'harm', 'mal'] },
    { id: 26, name: '26.jpg', keywords: ['drinking', 'bottle', 'boire', 'bouteille'] },
    { id: 27, name: '27.jpg', keywords: ['eating', 'chopsticks', 'manger', 'baguettes'] },
    { id: 28, name: '28.jpg', keywords: ['drink', 'cola', 'boisson'] },
    { id: 29, name: '29.jpg', keywords: ['hands', 'connection', 'mains', 'connexion'] },
    { id: 30, name: '30.jpg', keywords: ['hair', 'beauty', 'cheveux', 'beauté'] },
    { id: 31, name: '31.jpg', keywords: ['celebration', 'joy', 'célébration', 'joie'] },
    { id: 32, name: '32.jpg', keywords: ['rejection', 'loneliness', 'rejet', 'solitude'] },
    { id: 33, name: '33.jpg', keywords: ['crying', 'sadness', 'pleurer', 'tristesse'] },
    { id: 34, name: '34.jpg', keywords: ['tears', 'heartbreak', 'larmes', 'cœur brisé'] },
    { id: 35, name: '35.jpg', keywords: ['candy', 'sweet', 'bonbon', 'doux'] },
    { id: 36, name: '36.jpg', keywords: ['croissant', 'breakfast', 'petit-déjeuner'] },
    { id: 37, name: '37.jpg', keywords: ['chocolate', 'indulgence', 'chocolat'] },
    { id: 38, name: '38.jpg', keywords: ['sunglasses', 'money', 'lunettes', 'argent'] },
    { id: 39, name: '39.jpg', keywords: ['sexy', 'confident', 'fière', 'élégante'] },
    { id: 40, name: '40.jpg', keywords: ['love', 'heart', 'amour', 'fleur'] },
    { id: 41, name: '41.jpeg', keywords: ['blank', 'empty', 'vide', 'rien'] },
    { id: 42, name: '42.jpg', keywords: ['coffee', 'drink', 'café', 'boisson'] },
    { id: 43, name: '43.jpg', keywords: ['tired', 'slow', 'fatigué', 'lent'] },
    { id: 44, name: '44.jpg', keywords: ['angry', 'upset', 'fâché', 'énervé'] },
    { id: 45, name: '45.jpg', keywords: ['romantic', 'thought', 'pensée', 'amour'] },
    { id: 46, name: '46.jpg', keywords: ['worship', 'pray', 'adorer', 'prier'] },
    { id: 47, name: '47.jpg', keywords: ['cool', 'sunglasses', 'cool', 'lunettes'] },
    { id: 48, name: '48.jpg', keywords: ['villain', 'evil', 'méchant', 'mauvais'] },
    { id: 49, name: '49.jpg', keywords: ['confused', 'question', 'confus', 'question'] },
    { id: 50, name: '50.jpg', keywords: ['panic', 'scared', 'panique', 'effrayé'] },
    { id: 51, name: '51.jpg', keywords: ['girl', 'neutral', 'fille', 'neutre'] },
    { id: 52, name: '52.jpg', keywords: ['thug', 'adidas', 'racaille', 'adidas'] }
  ];

  // Filtrer les mèmes selon la recherche
  const filtered = useMemo(() => {
    if (!search.trim()) return memes;
    
    const query = search.toLowerCase();
    return memes.filter(meme =>
      meme.keywords.some(keyword =>
        keyword.toLowerCase().includes(query) || query.includes(keyword.toLowerCase())
      )
    );
  }, [search, memes]);

  const bgClass = isDark ? 'bg-gray-950' : 'bg-white';
  const textClass = isDark ? 'text-gray-100' : 'text-gray-900';
  const borderClass = isDark ? 'border-gray-800' : 'border-gray-200';
  const inputBgClass = isDark ? 'bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500';
  const tagBgClass = isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  const memeBoxClass = isDark ? 'bg-gray-900' : 'bg-gray-100';

  const handleCopyLink = (imageName) => {
    try {
      const imageUrl = `${window.location.origin}/assets/imgs/${imageName}`;
      
      // Créer un textarea temporaire
      const textarea = document.createElement('textarea');
      textarea.value = imageUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      
      // Sélectionner et copier
      textarea.select();
      document.execCommand('copy');
      
      // Nettoyer
      document.body.removeChild(textarea);
      
      setCopied(imageName);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
      alert('Erreur lors de la copie du lien');
    }
  };

  const handleDownloadImage = (imageName) => {
    const link = document.createElement('a');
    link.href = `/assets/imgs/${imageName}`;
    link.download = imageName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ fontFamily: FONT_FAMILY }} className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Header */}
      <Snowfall color="#82C3D9" snowflakeCount={100}/>
      <div className={`sticky top-0 z-50 ${bgClass} border-b ${borderClass} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Toggle tema */}
	  <Snowfall color="#82C3D9" snowflakeCount={100}/>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition ${isDark ? 'bg-gray-900 text-yellow-400 hover:bg-gray-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Titre au centre */}
          <h1 className={`text-5xl font-bold text-center tracking-wider ${textClass} mb-8`}>
           FLORK MEMES 🎄
          </h1>
          <p className={`text-xs italic text-center ${isDark ? 'text-gray-600' : 'text-gray-400'} mb-6`}><strong>
           @m_vdbk idea :)) 
          </strong></p>
          {/* Barre de recherche */}
          <div className="relative max-w-2xl mx-auto">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search a keyword... (funny, tired, sad, etc)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-yellow-400' : 'focus:ring-gray-900'} focus:border-transparent transition ${inputBgClass}`}
            /> 
            {search && (
              <button
                onClick={() => setSearch('')}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition ${isDark ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <X className="w-5 h-5" />
              </button>
            )}
           
          </div>
          <img src="https://emojis.slackmojis.com/emojis/images/1703244735/83772/flork30q.gif?1703244735" width="50"/>
          {/* Compteur de résultats */}
          <p className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-500'} mt-3 text-center`}>
            {filtered.length} meme{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Galerie */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((meme) => (
              <div
                key={meme.id}
                className="group cursor-pointer animate-fadeIn"
              >
                <div 
                  onClick={() => setEnlarged(meme.name)}
                  className={`relative overflow-hidden rounded-lg ${memeBoxClass} aspect-square mb-4 transition-all duration-300 group-hover:shadow-lg cursor-pointer`}
                >
                  <img 
                    src={`/assets/imgs/${meme.name}`}
                    alt={meme.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className={`w-full h-full flex items-center justify-center text-gray-500 text-center p-4`}>
                    <div>
                      <p className="text-sm font-medium">{meme.title}</p>
                      <p className="text-xs mt-2 opacity-50">Meme image</p>
                    </div>
                  </div>
                  
                  {/* Boutons d'action au survol */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyLink(meme.name);
                        }}
                        className={`p-3 rounded-full transition relative ${
                          copied === meme.name
                            ? isDark ? 'bg-green-600' : 'bg-green-500'
                            : isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'
                        } text-white`}
                        title="Copy image link"
                      >
                        <Copy className="w-5 h-5" />
                        {copied === meme.name && (
                          <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 text-xs font-medium px-2 py-1 rounded whitespace-nowrap z-10 ${isDark ? 'bg-gray-800 text-green-400' : 'bg-gray-700 text-green-300'}`}>
                            Copied !
                          </div>
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadImage(meme.name);
                        }}
                        className={`p-3 rounded-full transition ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} text-white`}
                        title="Download image"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className={`font-medium ${textClass}`}>{meme.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {meme.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        onClick={() => setSearch(keyword)}
                        className={`inline-block text-xs px-2 py-1 ${tagBgClass} rounded cursor-pointer transition`}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className={`text-lg ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>No meme found</p>
            <p className={`text-sm ${isDark ? 'text-gray-700' : 'text-gray-400'} mt-2`}>Try other keywords</p>
          </div>
        )}
      </div>

      {/* Modal d'agrandissement */}
      {enlarged && (
        <div 
          onClick={() => setEnlarged(null)}
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-fadeIn"
        >
          <img 
            src={`/assets/imgs/${enlarged}`}
            alt="Agrandissement"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
