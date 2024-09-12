"use client";

export function initVoice(speechSynthesis:SpeechSynthesis) {
    let voices = speechSynthesis.getVoices();
    let voice = voices.find(item => item.lang === "en-US");
    return voice;
}

export function say(speechSynthesis: SpeechSynthesis, voice:SpeechSynthesisVoice, text:string) {
    return new Promise((resolve) => {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voice;
        utterance.onend = () => {
            resolve(null);
        }
        speechSynthesis.speak(utterance);
    });
}