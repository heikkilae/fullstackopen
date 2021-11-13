# 0.4: uusi muistiinpano

```javascript
note over selain:
Selain postaa uuden noten HTML-formilla.
end note
selain->palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note note: "nnn"
note over palvelin:
Palvelin lisää uuden noten data.json:iin.
end note
palvelin-->selain: Palvelin uudelleenohjaa selaimen urliin: /exampleapp/notes (302)

note over selain:
Selain pyytää palvelimelta notes dokumentin (HTML-sivu).
end note
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
palvelin-->selain: HTML- koodi (200)

note over selain:
Selain suorittaa HTML-koodissa olevat pyynnöt palvelimelle.
end note
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
palvelin-->selain: main.css (200)
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
palvelin-->selain: main.js (200)

note over selain:
Selain alkaa suorittaa js-koodia
joka pyytää JSON-datan palvelimelta.
end note
selain->palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
palvelin-->selain: [{"content":"henlo from ger","date":"2021-11-12T17:45:50.929Z"}... (200)

note over selain
Selain suorittaa DOM-apin onreadystatechange event handlerin,
joka renderöi muistiinpanot näytölle.
end note
```

![alt text](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=bm90ZSBvdmVyIHNlbGFpbjoKUwADBSBwb3N0YWEgdXVkZW4gbm90ZW4gSFRNTC1mb3JtaWxsYS4KZW5kABQFCgA0Bi0-cGFsdmVsaW46IEhUVFAgUE9TVCBodHRwczovL3N0dWRpZXMuY3MuaGVsc2lua2kuZmkvZXhhbXBsZWFwcC9uZXdfAIEJBW5vdGU6ICJubm4iCgCBFQoAVAkKUABgByBsaXPDpMOkAIEXDWRhdGEuanNvbjppaW4AgRkLAIEUCC0tPgCBYgcgAD8JdXVkZWxsZWVub2hqYWEAggMGbWVuIHVybGlpbjogAIEZDW90ZXMgKDMwMikKAIETCwCCLRB5eXQAgRYFAIIMB21lbHRhAIJBBXMgZG9rdW1lbnRpbiAoAIJNBXNpdnUpAIItIkdFAIIhLW90ZXMAgWIUAINABSBrb29kaSAoMjAwAIErHHN1b3JpdHRhYQCDdQYAMAVzc2Egb2xldmF0IHB5eW5uw7Z0AIFbC2xlAHlQbWFpbi5jcwCBNxUAFAgAgUIHACZKagBVGmoAZggAg2QaYWxrYWEAgjILanMAgjUGYQpqb2thAIQTCkpTT04tZGF0YW4AhBsNAIM7UACGCgkAhXEUW3siY29udGVudCI6ImhlbmxvIGZyb20gZ2VyIiwiZGF0ZSI6IjIwMjEtMTEtMTJUMTc6NDU6NTAuOTI5WiJ9Li4uAIQuGACEMxJET00tYXBpbiBvbnJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgaGFuZGxlcmluLACCJQZyZW5kZXLDtmkgbXVpc3RpaW5wYW5vdCBuw6R5dMO2AIRiDQ&s=default "0.4: uusi muistiinpano")