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
    emotionalWordWheel: "Gefühlefinder"
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
    happy: "glücklich", optimistic: "optimistisch", trusting: "vertrauensvoll", peaceful: "friedlich", powerful: "stark",
    accepted: "akzeptiert", proud: "stolz", interested: "interessiert", content: "zufrieden",
    surprised: "überrascht", startled: "erschrocken", confused: "verwirrt", amazed: "erstaunt", excited: "aufgeregt",
    bad: "schlecht", bored: "gelangweilt", busy: "beschäftigt", stressed: "gestresst", tired: "müde",
    fearful: "ängstlich", scared: "verängstigt", anxious: "besorgt", insecure: "unsicher", weak: "schwach",
    rejected: "abgelehnt", threatened: "bedroht",
    angry: "wütend", letDown: "enttäuscht", humiliated: "gedemütigt", bitter: "verbittert", mad: "zornig",
    aggressive: "aggressiv", frustrated: "frustriert", distant: "distanziert", critical: "kritisch",
    disgusted: "angewidert", disapproving: "missbilligend", disappointed: "enttäuscht", awful: "schrecklich", repelled: "abgestoßen",
    sad: "traurig", hurt: "verletzt", depressed: "deprimiert", guilty: "schuldig", despair: "verzweifelt",
    vulnerable: "verletzlich", lonely: "einsam",
    inspired: "inspiriert", hopeful: "hoffnungsvoll", sensitive: "sensibel", intimate: "vertraut",
    thankful: "dankbar", loving: "liebevoll", courageous: "mutig", creative: "kreativ",
    respected: "respektiert", valued: "wertgeschätzt", successful: "erfolgreich", confident: "selbstbewusst",
    curious: "neugierig", inquisitive: "wissbegierig", joyful: "freudig", free: "frei",
    shocked: "schockiert", dismayed: "bestürzt", disillusioned: "desillusioniert", perplexed: "verwirrt",
    astonished: "erstaunt", awe: "ehrfürchtig", eager: "eifrig", energetic: "energiegeladen",
    indifferent: "gleichgültig", apathetic: "teilnahmslos", pressured: "unter Druck", rushed: "gehetzt",
    overwhelmed: "überfordert", out_of_control: "außer Kontrolle", sleepy: "schläfrig", unfocused: "unkonzentriert",
    helpless: "hilflos", frightened: "erschrocken", worried: "besorgt",
    inadequate: "unzulänglich", inferior: "minderwertig", worthless: "wertlos", insignificant: "unbedeutend",
    excluded: "ausgeschlossen", persecuted: "verfolgt", nervous: "nervös", exposed: "exponiert",
    betrayed: "verraten", resentful: "verbittert", disrespected: "respektlos behandelt", ridiculed: "lächerlich gemacht",
    indignant: "empört", violated: "verletzt", furious: "rasend", jealous: "eifersüchtig",
    provoked: "provoziert", hostile: "feindselig", infuriated: "aufgebracht", annoyed: "verärgert",
    withdrawn: "zurückgezogen", numb: "betäubt", skeptical: "skeptisch", dismissive: "ablehnend",
    judgmental: "verurteilend", embarrassed: "peinlich berührt", appalled: "entsetzt", revolted: "angewidert",
    nauseated: "übel", detestable: "abscheulich", horrified: "entsetzt", hesitant: "zögerlich",
    empty: "leer", remorseful: "reuevoll", ashamed: "beschämt", powerless: "machtlos",
    grief: "trauernd", fragile: "zerbrechlich", victimized: "viktimisiert", isolated: "isoliert",
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

function EmotionButton({ emotion, color, onClick, language }) {
  return (
    <Button 
      className="emotion-button" 
      onClick={onClick}
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
      <Text size="5" mb="4" weight="bold">
        {level === 0 ? t.chooseEmotion :
         level === 1 ? t.chooseMoreSpecific :
         t.chooseMostSpecific}
      </Text>
      <Flex wrap="wrap" gap="2" justify="center" mb="4">
        {Object.keys(emotions).map(emotion => (
          <EmotionButton 
            key={emotion} 
            emotion={emotion} 
            color={emotionColors[parentEmotion] || emotionColors[emotion] || 'gray'}
            onClick={() => {
              if (level === 2) {
                navigate(`/success/${parentEmotion}/${emotion}`);
              } else {
                navigate(`${emotion}`);
              }
            }}
            language={language}
          />
        ))}
      </Flex>
      {level > 0 && (
        <Button variant="outline" onClick={() => navigate(-1)}>
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
  const color = emotionColors[parentEmotion] || 'gray';
  const icon = emotionIcons[parentEmotion] || '😐';

  return (
    <Box className="success-page">
      <Text size="9" mb="4">{icon}</Text>
      <Text size="6" mb="2">{t.youAreFeeling}</Text>
      <Text size="8" weight="bold" mb="4" style={{ color: `var(--${color}-11)` }}>
        {emotionTranslations[language][emotion] || emotion}
      </Text>
      <Button onClick={() => navigate('/')}>
        <ReloadIcon /> {t.startOver}
      </Button>
    </Box>
  );
}

function EmotionRoute({ language, setBackgroundColor }) {
  const { emotion, subEmotion, subSubEmotion } = useParams();
  const level = subSubEmotion ? 2 : subEmotion ? 1 : emotion ? 0 : -1;
  
  let currentEmotions;
  let parentEmotion;
  if (level === -1) {
    currentEmotions = emotionsData;
    setBackgroundColor('blue');
  } else if (level === 0) {
    currentEmotions = emotionsData[emotion];
    parentEmotion = emotion;
    setBackgroundColor(emotionColors[emotion] || 'blue');
  } else if (level === 1) {
    currentEmotions = emotionsData[emotion][subEmotion];
    parentEmotion = emotion;
    setBackgroundColor(emotionColors[emotion] || 'blue');
  } else {
    currentEmotions = {};
    parentEmotion = emotion;
    setBackgroundColor(emotionColors[emotion] || 'blue');
  }

  return <EmotionSelector emotions={currentEmotions} level={level + 1} parentEmotion={parentEmotion} language={language} />;
}

function App() {
  const [language, setLanguage] = useState('en');
  const [backgroundColor, setBackgroundColor] = useState('blue');

  return (
    <Theme>
      <Router>
        <Box className="page-background" style={{ backgroundColor: `var(--${backgroundColor}-2)` }}>
          <Container size="2">
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
                  <Route path="/" element={<EmotionRoute language={language} setBackgroundColor={setBackgroundColor} />} />
                  <Route path="/:emotion" element={<EmotionRoute language={language} setBackgroundColor={setBackgroundColor} />} />
                  <Route path="/:emotion/:subEmotion" element={<EmotionRoute language={language} setBackgroundColor={setBackgroundColor} />} />
                  <Route path="/:emotion/:subEmotion/:subSubEmotion" element={<EmotionRoute language={language} setBackgroundColor={setBackgroundColor} />} />
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