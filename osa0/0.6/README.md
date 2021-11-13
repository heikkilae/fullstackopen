# 0.6: Uusi muistiinpano

```javascript
note over selain:
Käyttäjä triggeröi form.onsubmit eventin,
Eventti on tavallaan ylikirjoitettu (preventDefault)
ja se suorittaa uuden noten lisäyksen 
selaimessa näkyvään listaan.
Tämän jälkeen selain vasta pyytää palvelinta POST:lla
lisäämään noten data.json:iin.
end note
selain->palvelin: HTTP POST .../exampleapp/new_note_spa payload: {content: "hohoo", date: "2021-11-13T11:52:50.018Z"}
note over palvelin:
Palvelin lisää noten data.jsoniin ja vastaa
seuraavalla tavalla selaimelle:
end note
palvelin->selain: Response 200: {message: "note created"}
```

![alt text](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=bm90ZSBvdmVyIHNlbGFpbjoKS8OkeXR0w6Rqw6QgdHJpZ2dlcsO2aSBmb3JtLm9uc3VibWl0IGV2ZW50aW4sCkV2ZW50dGkgb24gdGF2YWxsYWFuIHlsaWtpcmpvaXRldHR1IChwcgArBURlZmF1bHQpCmphIHNlIHN1b3JpdHRhYSB1dWRlbiBub3RlbiBsaXPDpHlrc2VuIAoAgQ4FbWVzc2EgbsOka3l2w6TDpAAeBXRhYW4uClTDpG3DpG4gasOkbGtlZW4AgT0HIHZhc3RhIHB5eXTDpMOkIHBhbHZlbGludGEgUE9TVDpsbGEKAGIFADoFw6QAcwhkYXRhLmpzb246aWluLgplbmQAgQ8FAIEBBm4tPgBACDogSFRUUABHBSAuLi4vZXhhbXBsZWFwcC9uZXdfbm90ZV9zcGEgcGF5bG9hZDoge2NvbnRlbnQ6ICJob2hvbyIsIGRhdGU6ICIyMDIxLTExLTEzVDExOjUyOjUwLjAxOFoifQoAgxAKAG8JClAAgUMHAIIgBsOkAIEpEGlpbiBqYQCBegZhCnNldXJhAIMPBgCDFQgAg2AGbWVsbGU6AIFXCgCCGQgtPgCDfgcgUmVzcG9uc2UgMjAwOiB7AIJ_BWdlOiAiAIQrBWNyZWF0ZWQifQoK&s=default "websequencediagrams")