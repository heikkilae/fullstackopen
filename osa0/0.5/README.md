# 0.5: Single Page App

```javascript
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
palvelin->selain: HTML-koodi
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
palvelin->selain: main.css
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
palvelin->selain: spa.js

note over selain
Selain alkaa suorittaa js-koodia
joka pyytää JSON-datan palvelimelta.
end note

selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
palvelin-->selain: [{"content":"prematurata sì","date":"2021-11-12T17:46:51.479Z"}...

note over selain
Selain suorittaa data.jsonin saatuaan 
redrawNotes-functiossa olevat DOM-operaatiot 
renderöidäkkseen data.json:in sisällön listaksi.
end note

note over selain
Lisäksi main.js:ssä luodaan customoitu 
event händleri formin submittaukseen.
Händlerissä lisätään uusi note selaimessa näkyvään
listaan ja tämän jälkeen lähetetään pyyntö palvelimelle
lisätä note data.json.iin. Näin ollen data.jsonia 
ei tarvitse ladata uudelleen.
end note
```

![alt text](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=c2VsYWluLT5wYWx2ZWxpbjogSFRUUCBHRVQgaHR0cHM6Ly9zdHVkaWVzLmNzLmhlbHNpbmtpLmZpL2V4YW1wbGVhcHAvc3BhCgA5CC0-AE0GOiBIVE1MLWtvb2RpCgAhRW1haW4uY3NzAFgTABIJAIEHSC5qAFMUABIHCm5vdGUgb3ZlciAAgjkGClMAgkEFIGFsa2FhIHN1b3JpdHRhYSBqcwCBegZhCmpva2EgcHl5dMOkw6QgSlNPTi1kYXRhbiAAgnEHbWVsdGEuCmVuZCBub3RlCgCBbEZkYXRhLmpzb24AgxQKAIMVClt7ImNvbnRlbnQiOiJwcmVtYXR1cmF0YSBzw6wiLCJkYXRlIjoiMjAyMS0xMS0xMlQxNzo0Njo1MS40NzlaIn0uLi4AgXAaAIF6CgB7CWluIHNhYXR1YWFuIApyZWRyYXdOb3Rlcy1mdW5jdGlvc3NhIG9sZXZhdCBET00tb3BlcmFhdGlvdCAKcmVuZGVyw7ZpZMOka2tzZWVuAE0KOmluIHNpc8OkbGzDtm4gbGlzdGFrc2kAgkAMAIMeEUxpc8Oka3NpAIQyBmpzOnNzw6QgbHVvZGFhbiBjdXN0b21vaXR1IApldmVudCBow6RuZGxlcmkgZm9ybQCBWgVibWl0dGF1AIEIBS4KSAAZCABDBmlzw6QAg2UFbiB1dXNpAINOBQCEJQZtZXNzYSBuw6RreXYAHAUKAIEsBWFuIGphIHTDpG3DpG4gasOkbGtlZW4gbMOkaGV0ZQBEB3B5eW50w7YAhCgLbGUKAGQIAF4GAINoCS5paW4uIE7DpGluIG9sbACCJQxpYSAKZWkgdGFydml0c2UgbGFkYXRhIHV1ZGVsbACBSQUAhHwKCg&s=default "0.5: Single Page App")
