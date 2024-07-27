import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Theme, Button, Flex, Box, Text, Container } from '@radix-ui/themes';
import * as Accordion from '@radix-ui/react-accordion';
import { ReloadIcon, ArrowLeftIcon, ChevronDownIcon } from '@radix-ui/react-icons';
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
    emotionalWordWheel: "Feelings Finder",
    accordionTitle: "What is the Feelings Finder for?",
    accordionContent: `The Feelings Finder is based on Geoffrey Roberts' Emotional Word Wheel, a powerful tool for emotional intelligence and self-awareness. This wheel helps individuals identify and articulate their emotions with greater precision, promoting better understanding of oneself and improved communication with others.

    Roberts' Emotional Word Wheel categorizes emotions in a hierarchical structure, starting from basic emotions and branching out to more specific feelings. This approach allows users to navigate through different levels of emotional nuance, helping them pinpoint exactly what they're experiencing.

    By using this digital adaptation of the Emotional Word Wheel, you can:
    1. Enhance your emotional vocabulary
    2. Gain deeper insights into your emotional states
    3. Improve your ability to express feelings accurately
    4. Develop greater empathy by understanding the complexity of emotions

    We hope this tool helps you on your journey of emotional discovery and self-improvement. Remember, recognizing and naming your emotions is the first step towards managing them effectively.`
  },
  de: {
    chooseEmotion: "Wähle eine Emotion",
    chooseMoreSpecific: "Wähle eine spezifischere Emotion",
    chooseMostSpecific: "Wähle die spezifischste Emotion",
    youAreFeeling: "Du fühlst dich",
    startOver: "Neu starten",
    back: "Zurück",
    emotionalWordWheel: "Gefühle Finder",
    accordionTitle: "Wofür ist der Gefühle Finder gut?",
    accordionContent: `Der Gefühle Finder basiert auf Geoffrey Roberts' Emotional Word Wheel (Emotionales Wortrad), einem leistungsstarken Werkzeug für emotionale Intelligenz und Selbstwahrnehmung. Dieses Rad hilft Menschen, ihre Gefühle präziser zu identifizieren und zu artikulieren, was zu einem besseren Verständnis seiner selbst und einer verbesserten Kommunikation mit anderen führt.

    Roberts' Emotionales Wortrad kategorisiert Gefühle in einer hierarchischen Struktur, beginnend mit grundlegenden Emotionen und verzweigt sich zu spezifischeren Gefühlen. Dieser Ansatz ermöglicht es Benutzern, durch verschiedene Ebenen emotionaler Nuancen zu navigieren und hilft ihnen, genau zu erkennen, was sie gerade empfinden.

    Durch die Verwendung dieser digitalen Adaption des Emotionalen Wortrads können Sie:
    1. Ihren emotionalen Wortschatz erweitern
    2. Tiefere Einblicke in Ihre Gefühlszustände gewinnen
    3. Ihre Fähigkeit verbessern, Gefühle genau auszudrücken
    4. Größere Empathie entwickeln, indem Sie die Komplexität von Emotionen verstehen

    Wir hoffen, dass dieses Werkzeug Ihnen auf Ihrer Reise der emotionalen Entdeckung und Selbstverbesserung hilft. Denken Sie daran: Das Erkennen und Benennen Ihrer Gefühle ist der erste Schritt, um sie effektiv zu handhaben.`
  
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
      {level === 0 && (
        <Accordion.Root type="single" collapsible className="AccordionRoot">
          <Accordion.Item value="explanation" className="AccordionItem">
            <Accordion.Trigger className="AccordionTrigger">
              {t.accordionTitle}
              <ChevronDownIcon className="AccordionChevron" aria-hidden />
            </Accordion.Trigger>
            <Accordion.Content className="AccordionContent">
              <Text style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>
                {t.accordionContent}
              </Text>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      )}
      <Text className="emotion-instruction">
        {level === 0 ? t.chooseEmotion :
         level === 1 ? t.chooseMoreSpecific :
         t.chooseMostSpecific}
      </Text>
      <Flex className="emotion-button-container">
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
        <Button variant="outline" onClick={() => navigate(-1)} className="start-over-button">
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
      <Text size="9">{icon}</Text>
      <Text size="6">{t.youAreFeeling}</Text>
      <Text size="8" weight="bold" style={{ color: `var(--${color}-11)` }}>
        {emotionTranslations[language][emotion] || emotion}
      </Text>
      <Box className="quote-container">
        <Text size="3" style={{ fontStyle: 'italic' }} className="quote-text">"{quote.quote}"</Text>
        <br />
        <Text size="2" style={{ color: 'var(--gray-8)' }} className="quote-source">Alan Watts, {quote.source}</Text>
      </Box>
      <Button onClick={() => navigate('/')} className="start-over-button">
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
          <Box className="App" style={{ maxWidth: '600px', width: '100%' }}>
            <Button 
              className="language-toggle" 
              variant="ghost"
              size="4"
              onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
            >
              {language === 'en' ? '🇩🇪' : '🇬🇧'}
            </Button>
            <Text className="app-title">
              {translations[language].emotionalWordWheel}
            </Text>
            <Routes>
              <Route path="/" element={<EmotionRoute language={language} setAccentColor={setAccentColor} />} />
              <Route path="/:emotion" element={<EmotionRoute language={language} setAccentColor={setAccentColor} />} />
              <Route path="/:emotion/:subEmotion" element={<EmotionRoute language={language} setAccentColor={setAccentColor} />} />
              <Route path="/:emotion/:subEmotion/:subSubEmotion" element={<EmotionRoute language={language} setAccentColor={setAccentColor} />} />
              <Route path="/success/:parentEmotion/:emotion" element={<SuccessPage language={language} />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </Theme>
  );
}

export default App;
