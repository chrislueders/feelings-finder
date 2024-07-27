import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Theme, Button, Flex, Box, Text, Container } from '@radix-ui/themes';
import { ReloadIcon, ArrowLeftIcon } from '@radix-ui/react-icons';
import { emotionsData } from './emotionsData';
import '@radix-ui/themes/styles.css';
import './styles.css';

const translations = {
  en: {
    chooseEmotion: "Choose an emotion",
    chooseMoreSpecific: "Choose a more specific emotion",
    chooseMostSpecific: "Choose the most specific emotion",
    youAreFeeling: "You are feeling",
    startOver: "Start Over",
    back: "Back",
    emotionalWordWheel: "Feelings Finder"
  },
  de: {
    chooseEmotion: "Wähle eine Emotion",
    chooseMoreSpecific: "Wähle eine spezifischere Emotion",
    chooseMostSpecific: "Wähle die spezifischste Emotion",
    youAreFeeling: "Du fühlst dich",
    startOver: "Neu starten",
    back: "Zurück",
    emotionalWordWheel: "Gefühle Finder"
  }
};

const emotionTranslations = {
  en: {
    happy: "happy", optimistic: "optimistic", trusting: "trusting", peaceful: "peaceful", powerful: "powerful",
    accepted: "accepted", proud: "proud", interested: "interested", content: "content",
    surprised: "surprised", startled: "startled", confused: "confused", amazed: "amazed", excited: "excited",
    bad: "bad", bored: "bored", busy: "busy", stressed: "stressed", tired: "tired",
    fearful: "fearful", scared: "scared", anxious: "anxious", insecure: "insecure", weak: "weak",
    rejected: "rejected", threatened: "threatened",
    angry: "angry", letDown: "let down", humiliated: "humiliated", bitter: "bitter", mad: "mad",
    aggressive: "aggressive", frustrated: "frustrated", distant: "distant", critical: "critical",
    disgusted: "disgusted", disapproving: "disapproving", disappointed: "disappointed", awful: "awful", repelled: "repelled",
    sad: "sad", hurt: "hurt", depressed: "depressed", guilty: "guilty", despair: "despair",
    vulnerable: "vulnerable", lonely: "lonely",
    inspired: "inspired", hopeful: "hopeful", sensitive: "sensitive", intimate: "intimate",
    thankful: "thankful", loving: "loving", courageous: "courageous", creative: "creative",
    respected: "respected", valued: "valued", successful: "successful", confident: "confident",
    curious: "curious", inquisitive: "inquisitive", joyful: "joyful", free: "free",
    shocked: "shocked", dismayed: "dismayed", disillusioned: "disillusioned", perplexed: "perplexed",
    astonished: "astonished", awe: "awe", eager: "eager", energetic: "energetic",
    indifferent: "indifferent", apathetic: "apathetic", pressured: "pressured", rushed: "rushed",
    overwhelmed: "overwhelmed", out_of_control: "out of control", sleepy: "sleepy", unfocused: "unfocused",
    helpless: "helpless", frightened: "frightened", worried: "worried",
    inadequate: "inadequate", inferior: "inferior", worthless: "worthless", insignificant: "insignificant",
    excluded: "excluded", persecuted: "persecuted", nervous: "nervous", exposed: "exposed",
    betrayed: "betrayed", resentful: "resentful", disrespected: "disrespected", ridiculed: "ridiculed",
    indignant: "indignant", violated: "violated", furious: "furious", jealous: "jealous",
    provoked: "provoked", hostile: "hostile", infuriated: "infuriated", annoyed: "annoyed",
    withdrawn: "withdrawn", numb: "numb", skeptical: "skeptical", dismissive: "dismissive",
    judgmental: "judgmental", embarrassed: "embarrassed", appalled: "appalled", revolted: "revolted",
    nauseated: "nauseated", detestable: "detestable", horrified: "horrified", hesitant: "hesitant",
    empty: "empty", remorseful: "remorseful", ashamed: "ashamed", powerless: "powerless",
    grief: "grief", fragile: "fragile", victimized: "victimized", isolated: "isolated",
    abandoned: "abandoned"
  },
  de: {
    happy: "glücklich", optimistic: "zuversichtlich", trusting: "vertrauensvoll", peaceful: "friedlich", powerful: "kraftvoll",
    accepted: "akzeptiert", proud: "stolz", interested: "interessiert", content: "zufrieden",
    surprised: "überrascht", startled: "erschrocken", confused: "durcheinander", amazed: "verblüfft", excited: "begeistert",
    bad: "schlecht", bored: "gelangweilt", busy: "beschäftigt", stressed: "gestresst", tired: "erschöpft",
    fearful: "furchtsam", scared: "verängstigt", anxious: "besorgt", insecure: "unsicher", weak: "schwach",
    rejected: "zurückgewiesen", threatened: "bedroht",
    angry: "wütend", letDown: "enttäuscht", humiliated: "gedemütigt", bitter: "verbittert", mad: "aufgebracht",
    aggressive: "aggressiv", frustrated: "frustriert", distant: "distanziert", critical: "kritisch",
    disgusted: "angewidert", disapproving: "missbilligend", disappointed: "ernüchtert", awful: "furchtbar", repelled: "abgestoßen",
    sad: "traurig", hurt: "verletzt", depressed: "niedergeschlagen", guilty: "schuldig", despair: "verzweifelt",
    vulnerable: "verletzlich", lonely: "einsam",
    inspired: "inspiriert", hopeful: "hoffnungsvoll", sensitive: "feinfühlig", intimate: "vertraut",
    thankful: "dankbar", loving: "liebevoll", courageous: "mutig", creative: "kreativ",
    respected: "respektiert", valued: "wertgeschätzt", successful: "erfolgreich", confident: "selbstsicher",
    curious: "neugierig", inquisitive: "wissbegierig", joyful: "fröhlich", free: "frei",
    shocked: "schockiert", dismayed: "bestürzt", disillusioned: "desillusioniert", perplexed: "ratlos",
    astonished: "erstaunt", awe: "ehrfürchtig", eager: "eifrig", energetic: "energiegeladen",
    indifferent: "gleichgültig", apathetic: "teilnahmslos", pressured: "unter Druck", rushed: "gehetzt",
    overwhelmed: "überfordert", out_of_control: "außer Kontrolle", sleepy: "schläfrig", unfocused: "zerstreut",
    helpless: "hilflos", frightened: "erschrocken", worried: "beunruhigt",
    inadequate: "unzulänglich", inferior: "minderwertig", worthless: "wertlos", insignificant: "unbedeutend",
    excluded: "ausgeschlossen", persecuted: "verfolgt", nervous: "nervös", exposed: "bloßgestellt",
    betrayed: "verraten", resentful: "nachtragend", disrespected: "missachtet", ridiculed: "verspottet",
    indignant: "empört", violated: "verletzt", furious: "aufgebracht", jealous: "eifersüchtig",
    provoked: "provoziert", hostile: "feindselig", infuriated: "erzürnt", annoyed: "genervt",
    withdrawn: "zurückgezogen", numb: "gefühllos", skeptical: "skeptisch", dismissive: "ablehnend",
    judgmental: "verurteilend", embarrassed: "verlegen", appalled: "entsetzt", revolted: "empört",
    nauseated: "angewidert", detestable: "verabscheuungswürdig", horrified: "schockiert", hesitant: "zögerlich",
    empty: "leer", remorseful: "reumütig", ashamed: "beschämt", powerless: "machtlos",
    grief: "trauernd", fragile: "zerbrechlich", victimized: "zum Opfer gemacht", isolated: "isoliert",
    abandoned: "verlassen"
}
};

const emotionColors = {
  happy: 'yellow',
  surprised: 'purple',
  bad: 'gray',
  fearful: 'orange',
  angry: 'red',
  disgusted: 'green',
  sad: 'blue'
};

const emotionIcons = {
  happy: '😊',
  surprised: '😲',
  bad: '😔',
  fearful: '😨',
  angry: '😠',
  disgusted: '🤢',
  sad: '😢'
};

const alanWattsQuotes = {
  happy: {
    quote: "The meaning of life is just to be alive. It is so plain and so obvious and so simple. And yet, everybody rushes around in a great panic as if it were necessary to achieve something beyond themselves.",
    source: "The Culture of Counter-Culture (1969)"
  },
  surprised: {
    quote: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
    source: "The Wisdom of Insecurity (1951)"
  },
  bad: {
    quote: "You are an aperture through which the universe is looking at and exploring itself.",
    source: "The Book: On the Taboo Against Knowing Who You Are (1966)"
  },
  fearful: {
    quote: "To have faith is to trust yourself to the water. When you swim you don't grab hold of the water, because if you do you will sink and drown. Instead you relax, and float.",
    source: "Eastern Wisdom, Modern Life: Collected Talks: 1960-1969"
  },
  angry: {
    quote: "Muddy water is best cleared by leaving it alone.",
    source: "The Way of Zen (1957)"
  },
  disgusted: {
    quote: "The art of living... is neither careless drifting on the one hand nor fearful clinging to the past on the other. It consists in being sensitive to each moment, in regarding it as utterly new and unique, in having the mind open and wholly receptive.",
    source: "The Wisdom of Insecurity (1951)"
  },
  sad: {
    quote: "The more a thing tends to be permanent, the more it tends to be lifeless.",
    source: "The Wisdom of Insecurity (1951)"
  }
};

function EmotionButton({ emotion, onClick, language, color }) {
  return (
    <Button 
      className="emotion-button" 
      onClick={onClick}
      variant="soft"
      style={{ backgroundColor: `var(--${color}-3)`, color: `var(--${color}-11)` }}
    >
      {emotionTranslations[language][emotion] || emotion}
    </Button>
  );
}

function EmotionSelector({ emotions, level, parentEmotion, language }) {
  const navigate = useNavigate();
  const t = translations[language];

  if (!emotions || Object.keys(emotions).length === 0) {
    return <Text>No more specific emotions available.</Text>;
  }

  return (
    <Box className="emotion-selector">
      <Text size="5" mb="4" weight="bold" className="instruction-text">
        {level === 0 ? t.chooseEmotion :
         level === 1 ? t.chooseMoreSpecific :
         t.chooseMostSpecific}
      </Text>
      <Flex wrap="wrap" gap="2" justify="center" mb="4" className="emotion-button-container">
        {Object.keys(emotions).map(emotion => (
          <EmotionButton 
            key={emotion} 
            emotion={emotion} 
            onClick={() => {
              if (level === 2) {
                navigate(`/success/${parentEmotion}/${emotion}`);
              } else {
                navigate(`${emotion}`);
              }
            }}
            language={language}
            color={level === 0 ? emotionColors[emotion] : emotionColors[parentEmotion] || 'gray'}
          />
        ))}
      </Flex>
      {level > 0 && (
        <Button variant="outline" onClick={() => navigate(-1)} className="back-button">
          <ArrowLeftIcon /> {t.back}
        </Button>
      )}
    </Box>
  );
}

function SuccessPage({ language }) {
  const { parentEmotion, emotion } = useParams();
  const navigate = useNavigate();
  const t = translations[language];
  const icon = emotionIcons[parentEmotion] || '😐';
  const color = emotionColors[parentEmotion] || 'gray';
  const quote = alanWattsQuotes[parentEmotion];

  return (
    <Box className="success-page">
      <Flex direction="column" align="center" gap="4">
        <Text size="9" className="emotion-icon">{icon}</Text>
        <Text size="6" className="feeling-text">{t.youAreFeeling}</Text>
        <Text size="8" weight="bold" style={{ color: `var(--${color}-11)` }} className="emotion-text">
          {emotionTranslations[language][emotion] || emotion}
        </Text>
        <Box mt="4" mb="4" className="quote-container">
          <Text size="3" style={{ fontStyle: 'italic' }} className="quote-text">"{quote.quote}"</Text>
          <br />
          <Text size="2" mt="2" style={{ color: 'var(--gray-8)' }} className="quote-source">Alan Watts, {quote.source}</Text>
        </Box>
      </Flex>
      <Button onClick={() => navigate('/')} mt="6" className="start-over-button">
        <ReloadIcon /> {t.startOver}
      </Button>
    </Box>
  );
}

function EmotionRoute({ language, setAccentColor }) {
  const { emotion, subEmotion, subSubEmotion } = useParams();
  const level = subSubEmotion ? 2 : subEmotion ? 1 : emotion ? 0 : -1;
  
  let currentEmotions;
  let parentEmotion;
  if (level === -1) {
    currentEmotions = emotionsData;
    setAccentColor('blue');
  } else if (level === 0) {
    currentEmotions = emotionsData[emotion];
    parentEmotion = emotion;
    setAccentColor(emotionColors[emotion] || 'blue');
  } else if (level === 1) {
    currentEmotions = emotionsData[emotion][subEmotion];
    parentEmotion = emotion;
    setAccentColor(emotionColors[emotion] || 'blue');
  } else {
    currentEmotions = {};
    parentEmotion = emotion;
    setAccentColor(emotionColors[emotion] || 'blue');
  }

  return <EmotionSelector emotions={currentEmotions} level={level + 1} parentEmotion={parentEmotion} language={language} />;
}

function App() {
  const [language, setLanguage] = useState('en');
  const [accentColor, setAccentColor] = useState('blue');

  return (
    <Theme accentColor={accentColor} radius="large" scaling="105%">
      <Router>
        <Box className="page-background" style={{ backgroundColor: `var(--${accentColor}-2)` }}>
          <Container size="2" className="main-container">
            <Box className="App">
              <Button 
                className="language-toggle" 
                variant="ghost"
                size="4"
                onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
              >
                {language === 'en' ? '🇩🇪' : '🇬🇧'}
              </Button>
              <Flex direction="column" align="center" gap="4">
                <Text className="app-title" size="8" weight="bold">
                  {translations[language].emotionalWordWheel}
                </Text>
                <Routes>
                  <Route path="/" element={<EmotionRoute language={language} setAccentColor={setAccentColor} />} />
                  <Route path="/:emotion" element={<EmotionRoute language={language} setAccentColor={setAccentColor} />} />
                  <Route path="/:emotion/:subEmotion" element={<EmotionRoute language={language} setAccentColor={setAccentColor} />} />
                  <Route path="/:emotion/:subEmotion/:subSubEmotion" element={<EmotionRoute language={language} setAccentColor={setAccentColor} />} />
                  <Route path="/success/:parentEmotion/:emotion" element={<SuccessPage language={language} />} />
                </Routes>
              </Flex>
            </Box>
          </Container>
        </Box>
      </Router>
    </Theme>
  );
}

export default App;
