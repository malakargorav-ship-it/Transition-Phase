// Transition Phase — General English complete lesson library
// Question format: [question, options, correctOptionIndex, explanation]
const makeEnglishLesson=(title,intro,sections,examples,questions,revision)=>({title,intro,sections,examples,questions,revision});
window.englishLessons = {
"parts-of-speech": {
title:"Parts of Speech",
intro:"Sentence ko samajhne ka first step hai har word ka role pehchanna. English mein words ko unke function ke basis par eight traditional parts of speech mein classify kiya jata hai.",
sections:[
["1. The eight parts of speech","Noun names a person, place, thing or idea; pronoun replaces a noun; adjective describes a noun/pronoun; verb expresses action or state; adverb modifies a verb, adjective or another adverb; preposition shows relationship; conjunction joins words or clauses; interjection expresses sudden feeling."],
["2. Nouns and their types","Common: city; proper: Guwahati; collective: team; abstract: honesty; material: gold. Countable nouns have singular/plural forms (book/books); uncountable nouns are not normally counted individually (water, advice, furniture)."],
["3. Pronouns","Personal: I, she, they; possessive: mine, hers; reflexive: myself; demonstrative: this, those; relative: who, which, that; interrogative: who, what, which. Pronouns should agree with the nouns they refer to."],
["4. Adjectives and adverbs","Adjectives describe nouns: a careful driver. Degrees: tall, taller, tallest. Adverbs modify verbs/adjectives/adverbs: drive carefully, very tall, quite slowly. Avoid confusing good (adjective) with well (usually adverb)."],
["5. Verbs, prepositions and connectors","Main verbs carry meaning; auxiliaries help form tense, voice or questions (be, have, do); modals express ability, permission, possibility or obligation (can, may, must). Prepositions show relationships (in, on, at); conjunctions join ideas (and, but, because)."],
["6. Exam method","Ask what job the word performs in this sentence, not what it usually is. Fast is an adjective in 'a fast train' but an adverb in 'run fast'. A word's part of speech can change with context."]
],
examples:[["Example 1 — identify a noun","The committee announced its decision.","Committee is a collective noun; decision is an abstract noun."],["Example 2 — identify the adverb","She answered the question confidently.","Confidently modifies the verb answered, so it is an adverb."],["Example 3 — context changes word class","They arrived early. / It was an early train.","Early is an adverb in the first sentence and an adjective in the second."]],
questions:[
["Which word is a proper noun?",["river","city","Brahmaputra","mountain"],2,"Brahmaputra is the specific name of a river, so it is a proper noun."],
["Which is an abstract noun?",["chair","honesty","iron","teacher"],1,"Honesty names a quality or idea, not a physical object."],
["Which is an uncountable noun?",["coin","bottle","advice","apple"],2,"Advice is normally uncountable; say 'a piece of advice'."],
["Choose the reflexive pronoun.",["their","them","themselves","those"],2,"Themselves refers back to the subject."],
["In 'The child spoke softly', softly is a:",["noun","adjective","adverb","preposition"],2,"Softly modifies the verb spoke."],
["In 'a beautiful painting', beautiful is a:",["verb","adjective","adverb","conjunction"],1,"Beautiful describes the noun painting."],
["Which word is a conjunction?",["beneath","although","quickly","hers"],1,"Although connects a dependent clause to another clause."],
["Which is a modal auxiliary?",["walked","has","might","writing"],2,"Might expresses possibility."],
["In 'The keys are on the table', on is a:",["preposition","pronoun","adverb","interjection"],0,"On shows the relationship between keys and table."],
["Which sentence uses 'fast' as an adverb?",["A fast car passed.","The fast runner won.","Drive fast carefully.","It is a fast train."],2,"Fast modifies the verb drive; it describes how to drive."],
["Which is a collective noun?",["flock","kindness","silver","Delhi"],0,"A flock is a group of birds or animals."],
["Choose the interrogative pronoun.",["who","herself","those","ours"],0,"Who is used to ask a question about a person."],
["Which word is an interjection?",["Alas!","under","because","slowly"],0,"Alas expresses a sudden feeling of sorrow."],
["In 'She is very intelligent', very is a:",["noun","adverb","adjective","verb"],1,"Very modifies the adjective intelligent."],
["Which pair contains an adjective and an adverb respectively?",["careful, carefully","carefully, careful","care, careful","carefully, care"],0,"Careful describes a noun; carefully modifies an action."]
],
revision:["Eight traditional parts: noun, pronoun, adjective, verb, adverb, preposition, conjunction, interjection.","A noun names; a pronoun replaces; an adjective describes a noun.","An adverb can modify a verb, adjective or another adverb.","Countable: many books. Uncountable: much information/advice.","Classify a word by its function in the sentence; context can change its role."]
},
"tenses": {
title:"Tenses",
intro:"Tense verb ke through time aur action ki nature batata hai. Present, past aur future ke simple, continuous, perfect aur perfect continuous forms ko meaning ke saath samjho.",
sections:[
["1. Simple forms","Present simple: base verb (he/she/it + s/es); past simple: V2; future simple: will + V1. Habits, facts, completed past actions and future predictions/decisions ke liye use hote hain."],
["2. Continuous forms","Present: am/is/are + V-ing; past: was/were + V-ing; future: will be + V-ing. Kisi reference time par action in progress ho to continuous use karo."],
["3. Perfect forms","Present perfect: has/have + V3; past perfect: had + V3; future perfect: will have + V3. Ye completion ko present, past ya future reference point se connect karte hain."],
["4. Perfect continuous","Has/have been + V-ing; had been + V-ing; will have been + V-ing. Duration emphasise hoti hai. For + duration; since + starting point."],
["5. Time expressions","Yesterday/last year generally simple past; now/at the moment continuous; already/just/yet often perfect. Time words clues hain—final choice sentence ke meaning se karo."],
["6. Common errors","Did ke baad V1: did go, not did went. Will ke baad V1. Stative verbs (know, believe, own) normally continuous nahi hote. Finished past time ke saath present perfect avoid karo."]
],
examples:[["Simple present","She ___ to school every day.","Goes: third-person singular subject she takes -s/-es."],["Past perfect","The train ___ before we reached the station.","Had left: departure happened before another past event."],["Duration","They have been waiting ___ two hours.","For two hours expresses duration; since is used with a starting point."]],
questions:[
["He ___ cricket every Sunday.",["play","plays","playing","played"],1,"A habitual action uses simple present; he takes plays."],
["They ___ dinner when I called.",["have","were having","are having","will have"],1,"An action in progress at a past time uses past continuous."],
["I ___ my homework already.",["finish","finished","have finished","finishing"],2,"Present perfect is used for a completed action with present relevance."],
["By next June, she ___ here for five years.",["works","will have been working","worked","has worked"],1,"Future perfect continuous emphasises duration up to a future point."],
["If he ___ hard, he will pass.",["study","studies","studied","studying"],1,"In a first conditional, the if-clause takes simple present."],
["We ___ Guwahati last year.",["visit","visited","have visited","visiting"],1,"Last year is a finished past-time expression; use simple past."],
["The baby ___ now.",["sleeps","is sleeping","slept","has slept"],1,"Now indicates an action in progress: present continuous."],
["She ___ before the guests arrived.",["leaves","has left","had left","will leave"],2,"The earlier of two past actions takes past perfect."],
["Choose the correct sentence.",["Did you went there?","Did you go there?","Do you went there?","Did you going there?"],1,"Did is followed by the base form go."],
["I ___ him since 2020.",["know","am knowing","have known","knew"],2,"Since 2020 connects a state continuing to the present; know is stative."],
["At 8 pm tomorrow, I ___ for the exam.",["study","will be studying","studied","have studied"],1,"Future continuous describes an action in progress at a future time."],
["She ___ just ___ the email.",["has, sent","have, send","is, send","had, sends"],0,"Present perfect: has + past participle sent."],
["They ___ for an hour before the bus came.",["wait","have waited","had been waiting","will wait"],2,"Past perfect continuous shows duration before a past event."],
["Which time expression usually takes simple past?",["yesterday","since morning","right now","by tomorrow"],0,"Yesterday refers to a completed past time."],
["Water ___ at 100°C at standard atmospheric pressure.",["boil","boils","is boiling","boiled"],1,"A general scientific fact uses simple present."]
],
revision:["Present simple: base verb; he/she/it + s/es.","Past simple: V2; after did, use V1.","Continuous: be + V-ing.","Perfect: have/has/had + V3.","Perfect continuous: have/has/had been + V-ing.","For + duration; since + starting point."]
},
"subject-verb-agreement": {
title:"Subject–Verb Agreement",
intro:"Subject aur verb number/person mein agree karne chahiye. Long phrases, indefinite pronouns, either/or aur number expressions common exam traps hain.",
sections:[
["1. Basic rule","Singular subject takes singular verb; plural subject takes plural verb. He works; they work. Simple present mein third-person singular verb generally -s/-es leta hai."],
["2. Find the real subject","The verb nearest noun se nahi, grammatical subject se agree karta hai. 'The quality of the apples is good' mein subject quality hai, apples nahi."],
["3. Indefinite pronouns","Each, every, everyone, somebody, nobody and either generally singular. Both, few, many and several plural hote hain."],
["4. Either/or and neither/nor","Either...or aur neither...nor ke saath verb generally nearer subject se agree karta hai: Neither teacher nor students are; neither students nor teacher is."],
["5. Special expressions","A number of + plural noun takes plural verb; the number of + plural noun takes singular verb. Along with/as well as main subject ka number nahi badalte."],
["6. Amounts and titles","A period, distance or sum treated as one unit takes singular verb. Mathematics, news and book titles generally singular agreement lete hain."]
],
examples:[["Intervening phrase","The bouquet of roses ___ beautiful.","Is: head subject bouquet singular hai."],["Either/or","Neither the coach nor the players ___ ready.","Are: nearer subject players plural hai."],["Number phrase","A number of applicants ___ waiting.","Are: a number of ka meaning several hai."]],
questions:[
["Each of the boys ___ a notebook.",["have","has","are having","were"],1,"Each is singular and takes has."],
["The list of items ___ on the desk.",["are","were","is","have"],2,"The subject is list, singular."],
["Neither the principal nor the teachers ___ present.",["was","is","were","has"],2,"The nearer subject teachers is plural."],
["A number of students ___ absent today.",["is","are","has","was"],1,"A number of means several, so use a plural verb."],
["The number of road accidents ___ increasing.",["are","is","have","were"],1,"The number is the singular subject."],
["One of my friends ___ in Silchar.",["live","lives","living","have lived"],1,"One is singular; use lives."],
["Everyone ___ responsible for their own work.",["are","is","were","have"],1,"Everyone is grammatically singular."],
["The teacher, along with the students, ___ arrived.",["have","are","has","were"],2,"The main subject teacher is singular."],
["Five kilometres ___ a long distance to walk.",["are","were","is","have"],2,"The distance is treated as one unit."],
["Bread and butter ___ my usual breakfast.",["are","were","have","is"],3,"The phrase is treated as one combined item/meal."],
["Either the boys or their father ___ coming.",["are","were","is","have"],2,"The nearer subject father is singular."],
["Several ___ applied for the post.",["has","have","is","was"],1,"Several is plural."],
["The quality of these products ___ excellent.",["are","were","is","have"],2,"Quality is the head noun and is singular."],
["Mathematics ___ my favourite subject.",["are","were","is","have"],2,"The subject name Mathematics takes a singular verb."],
["Choose the correct sentence.",["She don't know.","She doesn't knows.","She doesn't know.","She not know."],2,"Doesn't is followed by the base verb know."]
],
revision:["Find the real subject/head noun before choosing the verb.","Each, every, everyone, someone and nobody are generally singular.","A number of + plural noun → plural verb; the number of → singular verb.","Either/or and neither/nor: agree with the nearer subject.","Along with/as well as does not change the number of the main subject."]
},
"articles-prepositions-conjunctions":makeEnglishLesson("Articles, Prepositions & Conjunctions","Articles nouns ko specify karte hain; prepositions relationships show karte hain; conjunctions words aur clauses ko connect karte hain. In teen areas mein fixed usage aur context dono important hain.",[
["1. Indefinite articles a/an","A consonant sound se pehle aur an vowel sound se pehle: a university, an hour. Letter nahi, pronunciation decide karta hai."],
["2. Definite article the","The unique, already-known ya specific noun ke saath; rivers, seas, mountain ranges, newspapers aur superlatives ke saath commonly use hota hai. General plural/uncountable nouns ke saath usually no article."],
["3. Zero article","Names of people/most countries, languages, subjects, meals and sports ke general use mein article nahi: India, English, mathematics, breakfast, football."],
["4. Prepositions of time and place","At a precise time/point; on a day/date/surface; in a month/year/long period/enclosed space. Example: at 6, on Monday, in November."],
["5. Common preposition patterns","Interested in, good at, depend on, afraid of, responsible for, prefer X to Y. Verb/adjective ke saath collocation yaad rakho."],
["6. Conjunctions and connectors","Coordinating: and, but, or, so; subordinating: because, although, if, while; correlative: either...or, neither...nor, not only...but also. Although ke saath but ko same clause pair mein repeat na karo."]
],[
["A/an by sound","She is ___ honest officer.","An: honest ka h silent hai, vowel sound se start hota hai."],
["Preposition of time","The meeting is ___ Monday.","On: days aur dates ke saath on use hota hai."],
["Conjunction","___ he was tired, he completed the task.","Although contrast introduce karta hai."]
],[
["She studies at ___ university.",["a","an","the","no article"],0,"University ka opening sound /y/ consonant sound hai, isliye a."],
["It took me ___ hour to finish.",["a","an","the","no article"],1,"Hour mein h silent hai; vowel sound ke karan an."],
["___ sun rises in the east.",["A","An","The","No article"],2,"The sun unique hai."],
["He lives ___ India.",["at","on","in","by"],2,"Country/large area ke saath in."],
["The exam begins ___ 9 a.m.",["in","on","at","by"],2,"Exact clock time ke saath at."],
["We have a test ___ Friday.",["at","in","on","for"],2,"Days ke saath on."],
["She is interested ___ music.",["on","at","in","for"],2,"Correct collocation: interested in."],
["He is good ___ mathematics.",["in","at","on","with"],1,"Correct expression: good at."],
["Success depends ___ regular practice.",["at","of","on","for"],2,"Depend takes the preposition on."],
["I prefer tea ___ coffee.",["than","over","to","from"],2,"Prefer X to Y."],
["___ it was raining, they continued playing.",["Because","Although","Unless","So"],1,"Although introduces contrast."],
["Hurry up, ___ you will miss the bus.",["and","but","or","because"],2,"Or expresses the negative consequence/alternative."],
["Choose the correct correlative pair.",["Either...nor","Neither...or","Either...or","Both...or"],2,"The standard pair is either...or."],
["He stayed home ___ he was unwell.",["because","although","unless","whereas"],0,"Because introduces a reason."],
["Choose the correct sentence.",["She is married with a doctor.","She is married to a doctor.","She is married by a doctor.","She is married from a doctor."],1,"The standard expression is married to."]
],["A before consonant sound; an before vowel sound (a university, an hour).","Use the for specific/unique nouns and many geographical names; avoid it for general plural nouns.","At = precise time; on = day/date/surface; in = month/year/area.","Learn adjective/verb + preposition combinations as fixed collocations.","Although/because/if/while introduce dependent clauses; and/but/or/so coordinate ideas."]),
"verbs-modals-conditionals":makeEnglishLesson("Verbs, Modals & Conditionals","Verbs sentence ka action/state batate hain. Auxiliary verbs tense, voice aur questions banate hain; modals attitude/possibility/obligation dikhate hain; conditionals result aur condition ka relation batate hain.",[
["1. Main and auxiliary verbs","Main verb meaning carry karta hai (write, think). Be, have, do auxiliaries tense, questions, negatives and passive structures banate hain."],
["2. Transitive and intransitive verbs","Transitive verb object leta hai: She opened the door. Intransitive verb ko direct object nahi chahiye: The baby slept."],
["3. Modal form","Modal + base verb (can go, should study). Modals ke baad to nahi aata, except semi-modals such as ought to and have to."],
["4. Meaning of common modals","Can ability/permission; could past ability/polite request; may permission/possibility; might weaker possibility; must strong obligation/deduction; should advice; would polite request/hypothetical."],
["5. Conditional types","Zero: If + present, present (general truth). First: If + present, will + V1 (real future possibility). Second: If + past, would + V1 (unreal/imaginary present). Third: If + past perfect, would have + V3 (unreal past)."],
["6. Common errors","Do not use will in a normal if-clause of first conditional. Modal ke baad V1. Mustn't means prohibited; don't have to means not necessary."]
],[
["Modal verb","You ___ wear a helmet while riding.","Must: strong obligation/safety requirement."],
["First conditional","If it rains, we ___ indoors.","Will stay: present simple in if-clause, will + V1 in result."],
["Third conditional","If she had studied, she ___ passed.","Would have: unreal past result uses would have + V3."]
],[
["You ___ respect traffic rules.",["should to","should","ought","must to"],1,"Should is followed directly by base verb."],
["When I was young, I ___ run very fast.",["can","could","may","must"],1,"Could expresses general past ability."],
["___ I borrow your pen?",["Must","May","Should","Would have"],1,"May is a polite way to ask permission."],
["You ___ smoke in this hospital.",["don't have to","mustn't","wouldn't","might"],1,"Mustn't expresses prohibition."],
["You ___ come early; the meeting has been cancelled.",["mustn't","don't have to","can't to","should to"],1,"Don't have to means there is no necessity."],
["If water reaches 100°C at standard pressure, it ___.",["boiled","boils","will boiling","would boil"],1,"Zero conditional states a general truth."],
["If I see him, I ___ him the message.",["tell","told","will tell","would told"],2,"First conditional: if + present, will + base verb."],
["If I ___ you, I would apologise.",["am","was","were","will be"],2,"Were is the conventional subjunctive form in this hypothetical."],
["If they had left earlier, they ___ the train.",["catch","will catch","would catch","would have caught"],3,"Third conditional: would have + V3."],
["She ___ be at home; all the lights are off.",["must","should to","can to","ought"],0,"Must expresses a strong logical deduction."],
["Choose the correct sentence.",["He can sings.","He can sing.","He cans sing.","He can to sing."],1,"A modal is followed by the base form."],
["Which verb is transitive?",["The child slept.","Birds fly.","She opened the window.","The sun rises."],2,"Opened has a direct object: the window."],
["Which is an auxiliary in 'They have finished'?",["They","have","finished","none"],1,"Have helps form the present perfect."],
["You ___ see a doctor if the pain continues.",["should","must to","can to","would have"],0,"Should gives advice."],
["If he ___ harder, he would improve.",["works","worked","will work","has worked"],1,"Second conditional uses past form in the if-clause."]
],["Main verb carries meaning; auxiliary helps build tense, questions, negatives or voice.","Modal + V1: can go, should study, must obey.","Mustn't = prohibited; don't have to = not necessary.","Zero: present/present; first: present/will; second: past/would; third: past perfect/would have + V3.","Avoid will in ordinary first-conditional if-clauses."]),
"active-passive-voice":makeEnglishLesson("Active & Passive Voice","Active voice mein subject action karta hai; passive voice mein subject par action hota hai. Passive transformation mein tense, object, auxiliary aur past participle sahi rakhna zaroori hai.",[
["1. Identify voice","Active: The officer arrested the thief. Passive: The thief was arrested by the officer. Active object passive subject ban jata hai."],
["2. Core structure","Passive = appropriate form of be + V3. Tense change nahi hota; auxiliary ko original tense ke according badla jata hai."],
["3. Tense patterns","Present simple: am/is/are + V3; past simple: was/were + V3; present continuous: am/is/are being + V3; past continuous: was/were being + V3; present perfect: has/have been + V3; future: will be + V3."],
["4. Modals and infinitives","Modal passive: modal + be + V3 (must be done). Infinitive passive: to be + V3. Perfect modal passive: should have been + V3."],
["5. Pronouns and by-phrase","Object pronoun becomes subject form (him → he); active subject becomes by + object form (she → by her). By-phrase omit kar sakte hain if agent unknown/unimportant."],
["6. Limits and exam traps","Only verbs with an object (transitive use) normally form passive. Keep tense and meaning; don't change time reference. Two-object verbs may allow two passive forms."]
],[
["Past simple","The police caught the thief.","The thief was caught by the police. Past simple passive = was/were + V3."],
["Present perfect","They have completed the work.","The work has been completed by them. Has been + V3."],
["Modal","You must follow the rules.","The rules must be followed. Modal + be + V3."]
],[
["The chef prepares the meal. (Passive)",["The meal prepared by the chef.","The meal is prepared by the chef.","The meal was prepared by the chef.","The meal has prepare by chef."],1,"Present simple passive: is + prepared."],
["They built this bridge in 2010.",["This bridge is built in 2010.","This bridge was built in 2010.","This bridge has built in 2010.","This bridge had build in 2010."],1,"Past simple passive: was + V3."],
["She is writing a letter.",["A letter is written by her.","A letter was being written by her.","A letter is being written by her.","A letter has been written by her."],2,"Present continuous passive: is being + V3."],
["He has solved the problem.",["The problem has been solved by him.","The problem had solved by him.","The problem is being solved by him.","The problem has solve by him."],0,"Present perfect passive: has been + V3."],
["They will announce the result tomorrow.",["The result will announce tomorrow.","The result will be announced tomorrow.","The result is announced yesterday.","The result has announced tomorrow."],1,"Future passive: will be + V3."],
["You must obey the law.",["The law must obey.","The law must be obeyed.","The law is must obeyed.","The law must have obey."],1,"Modal passive: must be + V3."],
["Someone stole my bicycle.",["My bicycle is stolen.","My bicycle was stolen.","My bicycle has stole.","My bicycle had stealing."],1,"Past simple passive is was + stolen."],
["The room ___ every day.",["cleans","is cleaned","cleaned","is cleaning"],1,"A repeated present action uses is cleaned."],
["The documents are being checked.",["They check the documents.","They are checking the documents.","They checked the documents.","They have checked the documents."],1,"Present continuous passive converts to are checking."],
["Who wrote this poem? (Passive)",["By whom was this poem written?","Who was this poem wrote?","By whom is this poem wrote?","Whom this poem written?"],0,"Question form retains past tense: was this poem written."],
["Choose the correct passive sentence.",["The match has postponed.","The match has been postponed.","The match is been postponed.","The match had postpone."],1,"Present perfect passive uses has been + V3."],
["People speak English worldwide.",["English is spoken worldwide.","English was spoken worldwide.","English has speak worldwide.","English speaks worldwide by people."],0,"Present simple passive: is spoken."],
["The teacher gave me a prize.",["I was given a prize by the teacher.","I am gave a prize by teacher.","I have gave a prize.","A prize gave me."],0,"With two objects, the indirect object can become passive subject."],
["The child laughed loudly.",["Loudly was laughed by the child.","The child was laughed loudly.","No normal passive form is possible.","Loudly is laughed by child."],2,"Laugh is intransitive here and has no direct object."],
["The work should ___ today.",["complete","be completed","been completed","be completing"],1,"Modal passive uses should + be + V3."]
],["Passive = correct form of be + V3.","Object of active sentence becomes subject of passive sentence.","Keep the original tense: was built, is being built, has been built.","Modal passive: modal + be + V3.","Intransitive verbs without an object normally cannot be passivised."]),
"direct-indirect-speech":makeEnglishLesson("Direct & Indirect Speech","Direct speech exact words quotation marks mein deta hai. Indirect speech reported meaning batata hai; tense, pronoun, time/place words aur sentence structure context ke hisaab se change hote hain.",[
["1. Reporting structure","Direct: He said, 'I am tired.' Indirect: He said that he was tired. Reporting verb aur reported clause identify karo."],
["2. Tense backshift","Agar reporting verb past mein ho, present simple → past simple; present continuous → past continuous; present perfect/past simple → past perfect; will → would; can → could; may → might. Universal truths generally backshift nahi hote."],
["3. Pronoun changes","Pronoun speaker, listener aur reporting subject ke relation se change hota hai. Mechanical I→he rule nahi: context dekho."],
["4. Time and place changes","Context shift hone par now→then, today→that day, yesterday→the previous day, tomorrow→the next day, here→there, this→that, these→those."],
["5. Questions","Yes/no question: asked + if/whether; wh-question: asked + wh-word. Indirect question statement word order mein hota hai: where he lived, not where did he live."],
["6. Commands and exclamations","Order/request: told/ordered/requested + object + to-infinitive; negative command: not to. Exclamation ko exclaimed with joy/sorrow/surprise jaise reporting phrase se convey kar sakte hain."]
],[
["Statement","She said, 'I am busy.'","She said that she was busy. Past reporting verb ke saath am → was."],
["Yes/no question","He said to me, 'Are you ready?'","He asked me if I was ready. Question becomes statement order."],
["Command","The teacher said, 'Open your books.'","The teacher told the students to open their books. Command uses object + to-infinitive."]
],[
["He said, 'I am ill.'",["He said that I am ill.","He said that he was ill.","He told that he is ill.","He says he was ill."],1,"I refers to the speaker; am backshifts to was."],
["She said, 'I have finished my work.'",["She said she has finish her work.","She said that she had finished her work.","She said that she finished tomorrow.","She told she had finish work."],1,"Present perfect generally backshifts to past perfect."],
["Rita said, 'I will call you tomorrow.'",["Rita said she will call me tomorrow.","Rita said that she would call me the next day.","Rita told that I would call tomorrow.","Rita says she called me."],1,"Will→would and tomorrow→the next day in shifted context."],
["He said to me, 'Do you know her?'",["He asked me if I knew her.","He asked me did I know her.","He told me if I know her.","He asked that do I know her."],0,"Yes/no questions use if/whether and statement word order."],
["She asked, 'Where do you live?'",["She asked where did I live.","She asked where I lived.","She asked where do I live.","She said where I live."],1,"Wh-word remains; auxiliary inversion is removed."],
["The teacher said, 'Do not make noise.'",["The teacher told us do not make noise.","The teacher ordered us not to make noise.","The teacher said us not making noise.","The teacher asked that no noise."],1,"Negative command uses object + not to + V1."],
["He said, 'The Earth moves around the Sun.'",["He said the Earth moved around the Sun.","He said that the Earth moves around the Sun.","He told Earth move Sun.","He said Earth had moved Sun."],1,"Universal truths generally retain the present tense."],
["Mother said to me, 'Please help me.'",["Mother requested me to help her.","Mother said me please help.","Mother asked that I helped her.","Mother told please helping."],0,"Polite request uses requested + object + to-infinitive."],
["'I can swim,' she said.",["She said she can swam.","She said that she could swim.","She said that she may swim.","She told she could swam."],1,"Can commonly backshifts to could."],
["He said, 'I saw him yesterday.'",["He said he had seen him the previous day.","He said he saw him tomorrow.","He said he has seen yesterday.","He told he had saw him."],0,"Past simple generally backshifts to past perfect; yesterday→previous day."],
["She said, 'What a beautiful flower!'",["She exclaimed that it was a very beautiful flower.","She asked what flower.","She told beautiful flower.","She said what a flower is."],0,"Exclamation is reported using exclaimed and an appropriate statement."],
["Choose the correct indirect question.",["He asked me where was I going.","He asked me where I was going.","He asked me where am I going.","He asked where did I go."],1,"Indirect questions use statement word order."],
["The officer said to the driver, 'Stop the car.'",["The officer ordered the driver to stop the car.","The officer said the driver stop car.","The officer asked that stop car.","The officer told stop the car driver."],0,"Order uses ordered + object + to + base verb."],
["She said, 'I may come today.'",["She said she might come that day.","She said she may came today.","She told she must come yesterday.","She said I might came."],0,"May→might and today→that day in shifted context."],
["He said to her, 'Are you coming with us?'",["He asked her whether she was coming with them.","He asked her are you coming with us.","He told her whether she comes.","He asked whether was she coming."],0,"Yes/no question uses whether and statement order; pronouns follow context."]
],["Past reporting verb often causes tense backshift; universal truths usually remain unchanged.","Pronouns depend on speaker, listener and context.","now→then; today→that day; yesterday→the previous day; tomorrow→the next day.","Yes/no question: asked if/whether + subject + verb.","Commands: told/ordered/requested + object + (not) to + V1."]),
"question-tags":makeEnglishLesson("Question Tags","Question tags short confirmation questions hote hain. Positive statement ke saath negative tag aur negative statement ke saath positive tag aata hai; auxiliary aur subject pronoun carefully select karo.",[
["1. Basic polarity rule","Positive statement → negative tag: You are ready, aren't you? Negative statement → positive tag: She isn't late, is she?"],
["2. Repeat the auxiliary","Statement mein auxiliary ho to tag mein wahi auxiliary use karo. Main verb simple present/past mein do/does/did use hota hai."],
["3. Subject pronoun","Tag mein noun ko suitable pronoun se replace karo: Rina is here, isn't she? The boys came, didn't they?"],
["4. Special forms","I am → aren't I? Let's → shall we? Imperative request often uses will you?; negative imperative often uses will you? as well."],
["5. Indefinite pronouns","Everyone, somebody, nobody etc. ke tag mein commonly they use hota hai: Everyone came, didn't they? Nothing is wrong, is it?"],
["6. Meaning and intonation","Rising intonation genuine question; falling intonation confirmation. Never use a tag that conflicts with the statement's polarity."]
],[
["Positive statement","He can drive, ___?","Can't he? Positive statement takes negative tag and repeats can."],
["Negative statement","They haven't arrived, ___?","Have they? Negative statement takes positive tag."],
["Special subject","I am late, ___?","Aren't I? This is the conventional tag form."]
],[
["You are a student, ___?",["are you","aren't you","don't you","won't you"],1,"Positive are statement takes negative aren't tag."],
["She doesn't sing, ___?",["does she","doesn't she","is she","did she"],0,"Negative statement takes positive tag; repeat does."],
["They went home, ___?",["don't they","didn't they","weren't they","haven't they"],1,"Past simple uses did in the tag."],
["He has finished, ___?",["hasn't he","doesn't he","isn't he","didn't he"],0,"Has is the auxiliary, so repeat it."],
["I am your friend, ___?",["amn't I","aren't I","isn't I","don't I"],1,"The conventional tag for I am is aren't I."],
["Let's begin, ___?",["will we","shall we","do we","aren't we"],1,"Let's takes shall we."],
["Close the door, ___?",["shall we","will you","do you","aren't you"],1,"Imperatives commonly take will you."],
["Nobody called, ___?",["didn't they","did they","did he","was he"],1,"Nobody is negative; use positive tag. They is commonly used."],
["Nothing happened, ___?",["did it","didn't it","was it","wasn't it"],0,"Nothing is negative and takes positive tag with it."],
["The boys are playing, ___?",["are they","aren't they","don't they","didn't they"],1,"Positive are statement takes aren't they."],
["She can speak French, ___?",["doesn't she","can't she","can she","isn't she"],1,"Repeat modal can and reverse polarity."],
["You never smoke, ___?",["don't you","do you","did you","aren't you"],1,"Never makes the statement negative; tag is positive."],
["There is a problem, ___?",["isn't there","is there","doesn't it","isn't it"],0,"There is retained as the tag subject."],
["He used to live here, ___?",["usedn't he","didn't he","doesn't he","wasn't he"],1,"Used to commonly takes didn't in modern tag questions."],
["Choose the correct tag.",["She rarely visits, doesn't she?","She rarely visits, does she?","She rarely visits, isn't she?","She rarely visits, did she?"],1,"Rarely has negative meaning, so the tag is positive."]
],["Positive statement → negative tag; negative statement → positive tag.","Repeat the auxiliary/modal; use do/does/did if none is present.","Replace the subject noun with a pronoun.","I am → aren't I? Let's → shall we? Imperative → will you?","Never, hardly, rarely, nobody and nothing carry negative meaning."]),
"vocabulary-builder":makeEnglishLesson("Vocabulary Builder","Vocabulary questions mein meaning, context aur word relationship test hota hai. Synonym/antonym ko sentence context ke saath samjho; homophones aur homonyms ko confuse mat karo.",[
["1. Synonyms","Synonyms similar meaning wale words hain; exact interchangeability context par depend karti hai. Begin/start similar hain, lekin collocation check karo."],
["2. Antonyms","Antonyms opposite meanings show karte hain: scarce/abundant, expand/contract. Prefix se opposite ban sakta hai, par har prefix-word natural nahi hota."],
["3. Homophones","Sound same, spelling/meaning different: their/there, right/write, flour/flower. Sentence grammar se correct form identify karo."],
["4. Homonyms and homographs","Homonyms same spelling/sound ke saath different meanings rakh sakte hain; homographs same spelling but different pronunciation/meaning bhi ho sakte hain (lead metal / lead a team)."],
["5. Contextual vocabulary","Unknown word ke surrounding clues dekho: definition, contrast, example, cause-effect, tone. Word ka part of speech bhi check karo."],
["6. Precision and register","Formal/informal, positive/negative connotation aur collocations matter karte hain. E.g. make a decision, heavy rain, strong argument."]
],[
["Synonym","Choose a synonym for 'concise'.","Brief: concise means expressing much in few words."],
["Antonym","Choose the antonym of 'scarce'.","Abundant: scarce means insufficient or hard to find."],
["Context clue","Despite the arduous climb, they reached the summit.","Arduous means difficult or requiring great effort."]
],[
["Choose the synonym of 'abundant'.",["scarce","plentiful","empty","limited"],1,"Plentiful means available in large quantities."],
["Choose the antonym of 'reluctant'.",["unwilling","hesitant","eager","doubtful"],2,"Eager is the opposite of reluctant/unwilling."],
["A synonym of 'concise' is:",["brief","lengthy","unclear","careless"],0,"Concise means brief and to the point."],
["The antonym of 'expand' is:",["enlarge","extend","contract","increase"],2,"Contract means become smaller."],
["Choose the correct homophone: Please ___ your name here.",["right","write","rite","wright"],1,"Write means to put words on paper."],
["The students left ___ books in the classroom.",["there","they're","their","theirs"],2,"Their is the possessive determiner."],
["The word 'flour' sounds like:",["flower","floor","flow","flaw"],0,"Flour and flower are homophones."],
["In 'The bank approved the loan', bank means:",["river edge","financial institution","a row","to rely"],1,"Loan context identifies a financial institution."],
["'Arduous' most nearly means:",["easy","difficult","pleasant","ordinary"],1,"Arduous describes something requiring great effort."],
["Choose the antonym of 'optimistic'.",["hopeful","confident","pessimistic","positive"],2,"Pessimistic is the opposite of optimistic."],
["A synonym of 'diligent' is:",["lazy","careless","hardworking","impatient"],2,"Diligent means careful and hardworking."],
["Choose the word that means 'to make less severe'.",["intensify","alleviate","worsen","provoke"],1,"Alleviate means reduce pain, difficulty or severity."],
["The word 'lead' in 'She will lead the team' means:",["a metal","guide","a pencil core","a delay"],1,"Here lead is a verb meaning guide."],
["Choose the correct word: The medicine had no ___ effect.",["adverse","averse","reverse","diverse"],0,"Adverse means harmful or unfavourable."],
["'Meticulous' means:",["careless","very careful and precise","angry","quick"],1,"Meticulous describes great attention to detail."]
],["Synonym = similar meaning; antonym = opposite meaning; context decides the best fit.","Homophones sound alike but differ in spelling/meaning: their/there, flour/flower.","Use surrounding clues to infer unfamiliar vocabulary.","Check part of speech and collocation before selecting a word.","Adverse = harmful; averse = opposed/unwilling."]),
"word-power":makeEnglishLesson("Word Power: One-word Substitution, Idioms & Phrasal Verbs","One-word substitutions concise labels dete hain; idioms figurative meaning rakhte hain; phrasal verbs verb + particle se bante hain. Literal translation ke bajay accepted meaning learn karo.",[
["1. One-word substitution","A person who writes poems = poet; one who cannot read/write = illiterate; a place where books are kept = library. Definition ke key feature ko identify karo."],
["2. People and specialists","Benevolent = kind; omniscient = all-knowing; bilingual = using two languages; atheist = one who does not believe in God. Similar-looking terms distinguish karo."],
["3. Idioms","Idioms ka meaning literal words se predict nahi hota: once in a blue moon = rarely; break the ice = start friendly interaction; spill the beans = reveal a secret."],
["4. Phrasal verbs","Look after = care for; give up = quit; put off = postpone; carry out = perform; run into = meet unexpectedly. Particle meaning ko change karta hai."],
["5. Confusable expressions","Beside = next to; besides = in addition. Affect is usually a verb; effect usually a noun. Accept = receive; except = excluding."],
["6. Exam strategy","Read full sentence, identify grammatical slot, then meaning. Idiom/phrasal verb ka tense and object placement bhi check karo."]
],[
["One-word substitution","A person who speaks two languages.","Bilingual: bi- means two and lingual relates to language."],
["Idiom","He visits us once in a blue moon.","It means he visits very rarely."],
["Phrasal verb","The meeting was put off.","Put off means postponed."]
],[
["A person who writes poems is a:",["novelist","poet","critic","editor"],1,"A poet writes poems."],
["One who cannot read or write is:",["eligible","illegible","illiterate","immature"],2,"Illiterate describes a person unable to read/write."],
["A place where books are kept for public use is a:",["laboratory","library","museum","factory"],1,"A library stores books for reading/borrowing."],
["'Once in a blue moon' means:",["every day","very rarely","at night","very quickly"],1,"The idiom means very rarely."],
["'Break the ice' means:",["damage something","start a conversation comfortably","end a friendship","feel cold"],1,"It means reduce initial awkwardness."],
["'Spill the beans' means:",["cook food","waste money","reveal a secret","make a mess"],2,"The idiom means disclose secret information."],
["'Look after' means:",["search","take care of","ignore","resemble"],1,"Look after means care for."],
["'Put off' means:",["postpone","wear","remove","encourage"],0,"Put off means delay/postpone."],
["'Carry out' means:",["transport outside","perform or execute","cancel","criticise"],1,"Carry out means perform a task or plan."],
["'Give up' means:",["distribute","quit or stop trying","donate","continue"],1,"Give up means stop doing or attempting something."],
["Choose the correct word: Everyone came ___ Ravi.",["accept","except","expect","aspect"],1,"Except means excluding."],
["Choose the correct word: The new rule may ___ attendance.",["effect","affect","effort","affection"],1,"Affect is commonly the verb meaning influence."],
["'At the eleventh hour' means:",["very early","at the last moment","at 11 a.m.","after eleven days"],1,"It means at the last possible moment."],
["A person who knows everything is:",["anonymous","omniscient","optimistic","amateur"],1,"Omniscient means all-knowing."],
["'Run into an old friend' means:",["collide with","meet unexpectedly","run away from","compete against"],1,"Run into can mean encounter unexpectedly."]
],["Learn one-word substitutions with their defining feature.","Idioms are figurative: break the ice, spill the beans, once in a blue moon.","Phrasal verbs: look after = care for; put off = postpone; carry out = perform.","Beside = next to; besides = in addition. Accept = receive; except = excluding.","Affect is usually a verb; effect is usually a noun."]),
"spelling-word-formation":makeEnglishLesson("Spelling & Word Formation","Spelling questions mein common letter patterns, confusing spellings aur prefixes/suffixes test hote hain. Word formation se meaning aur part of speech dono samajh aate hain.",[
["1. Frequently misspelled words","Common exam words: accommodation, necessary, separate, definitely, occurrence, privilege, government, pronunciation. Correct spelling ko visualise aur revise karo."],
["2. Double consonants","Necessary has one c and two s; accommodation has double c and double m; occurrence has double c and double r. Word family patterns notice karo."],
["3. Prefixes","Un-/in-/im-/ir-/dis- often form negatives: unhappy, incorrect, impossible, irregular, disagree. Prefix spelling next consonant ke saath adapt ho sakti hai."],
["4. Suffixes and word class","-ness/-ment/-tion often form nouns; -ful/-less form adjectives; -ly often forms adverbs; -ise/-ize often forms verbs. Exceptions exist, so check usage."],
["5. Word-family changes","Decide → decision; explain → explanation; succeed → success/successful; strong → strength. Spelling may change when suffix is added."],
["6. Usage and proofreading","Their/there, principal/principle, stationery/stationary, complement/compliment. Sentence context, grammar and meaning decide."]
],[
["Correct spelling","Choose the correct spelling of accommodation.","Accommodation: double c and double m."],
["Prefix","The opposite of regular is ___.","Irregular: ir- is used before r."],
["Word formation","The noun form of decide is ___.","Decision: decide changes to decision."]
],[
["Choose the correct spelling.",["accomodation","accommodation","acommodation","accommadation"],1,"Accommodation has double c and double m."],
["Choose the correct spelling.",["neccessary","necessary","necesary","necessery"],1,"Necessary has one c and double s."],
["Choose the correct spelling.",["seperate","separate","separrate","seperete"],1,"The correct spelling is separate."],
["Choose the correct spelling.",["definately","definitely","definitly","definetely"],1,"Definitely is spelled d-e-f-i-n-i-t-e-l-y."],
["Choose the correct spelling.",["priviledge","privilege","privelege","privillage"],1,"Privilege ends in -lege."],
["The correct prefix form is:",["inregular","irregular","unregular","disregular"],1,"Ir- is used before words beginning with r."],
["The opposite of possible is:",["unpossible","impossible","inpossible","dispossible"],1,"Im- is used before p in impossible."],
["The noun form of 'decide' is:",["deciding","decision","decisive","decided"],1,"Decision is the noun."],
["The adjective form of 'care' meaning full of care is:",["carely","carement","careful","caretion"],2,"-ful forms the adjective careful."],
["The adverb form of 'quick' is:",["quickness","quickly","quicken","quicker"],1,"-ly forms the adverb quickly."],
["Choose the correct word: The school ___ addressed the assembly.",["principal","principle","principel","principle's"],0,"Principal means head of a school."],
["Choose the correct word: Please remain ___ while the vehicle is parked.",["stationery","stationary","stationer","stationed"],1,"Stationary means not moving."],
["Choose the correct word: Your kind words ___ my effort.",["complement","compliment","complemented","complimentary"],1,"Compliment means praise."],
["Choose the correct spelling.",["occurrence","occurence","ocurrence","occurance"],0,"Occurrence has double c and double r."],
["Choose the correct spelling.",["pronounciation","pronunciation","pronunciatione","pronuncation"],1,"Pronunciation is spelled without the extra 'o' after n."]
],["Memorise tricky spellings: accommodation, necessary, separate, definitely, privilege, occurrence.","Prefixes: unhappy, incorrect, impossible, irregular, disagree.","Suffixes: -ness/-ment/-tion (nouns), -ful/-less (adjectives), -ly (often adverbs).","Word families can change spelling: decide→decision; explain→explanation.","Use sentence context to distinguish principal/principle and stationary/stationery."]),
"sentence-skills":makeEnglishLesson("Sentence Skills: Error Spotting & Correction","Sentence skills grammar ko real sentence mein apply karte hain. Subject-verb agreement, tense, pronoun, article, preposition, parallel structure aur punctuation ko systematic tareeke se check karo.",[
["1. Error spotting method","Sentence ko subject, verb, object/complement aur modifiers mein divide karo. Verb agreement, tense, pronoun reference, article/preposition aur word order check karo."],
["2. Sentence correction","Meaning preserve karte hue grammar aur clarity improve karo. Unnecessary words, wrong tense, double negatives aur faulty comparisons avoid karo."],
["3. Fill in the blanks","Blank ke pehle/baad grammar clues dekho: article + noun, modal + V1, preposition + noun/gerund, conjunction + clause."],
["4. Sentence completion","Logical relation identify karo—cause, contrast, condition, result or purpose. Connector sentence ke meaning se match hona chahiye."],
["5. Punctuation and capitalisation","Sentence starts capital; proper nouns capital; statement ends full stop; direct questions question mark; quotation marks exact spoken words ko enclose karte hain. Comma separates items/clauses where needed."],
["6. Parallelism and modifiers","List mein same grammatical form rakho: reading, writing and speaking. Modifier ko us word ke paas rakho jise describe karta hai; dangling modifiers meaning distort karte hain."]
],[
["Error spotting","Each of the players have a uniform.","Have is incorrect; each is singular, so use has."],
["Parallel structure","She likes reading, writing and to swim.","Use reading, writing and swimming for parallel structure."],
["Connector","He was tired; however, he continued working.","However shows contrast between tiredness and continuing."]
],[
["Choose the correct sentence.",["Each of the students have a book.","Each of the students has a book.","Each students has a book.","Each student have a book."],1,"Each is singular and takes has."],
["Choose the correct sentence.",["She is senior than me.","She is senior to me.","She is more senior than to me.","She senior to I."],1,"Senior takes the preposition to."],
["Choose the correct sentence.",["He did not went there.","He did not go there.","He does not went there.","He not go there."],1,"Did not is followed by base verb go."],
["Choose the correct sentence.",["Neither of the answers are correct.","Neither of the answers is correct.","Neither answers is correct.","Neither answer are correct."],1,"Neither is generally singular in formal exam grammar."],
["Choose the correct sentence.",["She enjoys to read.","She enjoys reading.","She enjoy reading.","She enjoying read."],1,"Enjoy is followed by a gerund."],
["Fill in: He is capable ___ solving the problem.",["to","for","of","with"],2,"Capable takes of + gerund/noun."],
["Fill in: I would rather walk ___ wait.",["than","to","from","then"],0,"Would rather X than Y."],
["Choose the correct connector: It was raining, ___ we stayed inside.",["because","so","although","unless"],1,"So introduces the result."],
["Choose the correctly punctuated sentence.",["Where are you going.","Where are you going?","Where are you going,","Where are you going!"],1,"A direct question ends with a question mark."],
["Choose the correctly capitalised sentence.",["we visited assam in april.","We visited Assam in April.","We visited assam in April.","We visited Assam in april."],1,"Sentence start, proper place and month are capitalised."],
["Choose the parallel sentence.",["He likes reading, to write and swimming.","He likes reading, writing and swimming.","He likes to read, writing and swim.","He likes read, write and swimming."],1,"All three items use the -ing form."],
["Identify the error: 'The news are encouraging.'",["The","news","are","encouraging"],2,"News is grammatically singular: the news is."],
["Choose the best improvement: 'He is more taller than me.'",["He is tallest than me.","He is taller than me.","He is more tall than me.","No improvement"],1,"Do not use more with the -er comparative."],
["Fill in: No sooner had he arrived ___ it began to rain.",["when","then","than","that"],2,"The correlative structure is no sooner...than."],
["Choose the correct sentence.",["Despite of the rain, we played.","Despite the rain, we played.","Although the rain, we played.","In spite the rain, we played."],1,"Despite is not followed by of."]
],["Check subject–verb agreement, tense, pronoun, article, preposition and word order.","Modal + V1; enjoy + gerund; capable of + gerund/noun.","Use connectors according to logic: because (reason), so (result), although (contrast).","Keep lists parallel: reading, writing and speaking.","Capitalise sentence starts, proper nouns and months; punctuate direct questions with ?."]),
"cloze-para-jumbles":makeEnglishLesson("Cloze Test & Para Jumbles","Cloze test mein passage context aur grammar dono test karta hai. Para jumble mein sentence links, chronology, pronoun reference aur logical flow identify karke paragraph arrange karo.",[
["1. Cloze test approach","Passage ek baar overall meaning ke liye padho. Har blank ka part of speech, tense, collocation, connector aur positive/negative tone identify karo."],
["2. Grammar clues","Article ke baad noun; modal ke baad V1; preposition ke baad noun/gerund; singular subject ke saath singular verb. Options ko grammar se eliminate karo."],
["3. Context and collocation","Word grammatically fit ho sakta hai but context mein wrong ho sakta hai. Make a decision, take action, heavy rain, strong evidence jaise natural combinations pehchano."],
["4. Para jumble opening","Opening sentence generally topic introduce karta hai; unexplained pronouns (he/this/they) usually pehle antecedent maangte hain. A sentence with 'however' often contrasts an earlier idea."],
["5. Linking sentences","Pronoun reference, repeated keywords, cause-result, time sequence, general-to-specific and problem-solution links use karo. Articles 'a' introduce and 'the' refer back kar sakte hain."],
["6. Final sequence check","Proposed order ko ek paragraph ki tarah read karo. Pronouns, connectors, chronology and conclusion logically flow karne chahiye."]
],[
["Cloze context","Regular exercise improves ___ health.","Overall: overall health is the natural collocation and fits the meaning."],
["Connector clue","The road was blocked. ___, we took another route.","Therefore signals the result of the road being blocked."],
["Para jumble","A: Finally, the seeds grow. B: First, seeds are planted. C: They are watered regularly.","B-C-A: planting precedes watering; growth follows."]
],[
["Choose the best word: Good planning is ___ for success.",["essential","careless","opposite","rarely"],0,"Essential means necessary; it fits the context."],
["Choose the connector: He studied hard; ___, he passed.",["however","therefore","although","unless"],1,"Therefore introduces the result."],
["Choose the correct collocation.",["do a decision","make a decision","take a decisioning","give decision"],1,"Make a decision is the standard collocation."],
["Choose the best word: The instructions were clear and easy to ___.",["follow","followed","following","follows"],0,"To + base verb: easy to follow."],
["Choose the correct connector: ___ he was ill, he attended class.",["Because","Although","Therefore","So"],1,"Although expresses contrast."],
["Choose the best fit: The forest is home ___ many species.",["for","with","to","at"],2,"The phrase is home to."],
["Choose the best word: The team worked ___ to meet the deadline.",["cooperation","cooperate","cooperatively","cooperative"],2,"An adverb modifies the verb worked."],
["Choose the best connector: The data was incomplete. ___, no final conclusion was drawn.",["As a result","In contrast","For example","Meanwhile"],0,"As a result introduces the consequence."],
["Arrange: A. Finally, the report was submitted. B. The team collected the data. C. They analysed the findings. D. Then they prepared a report.",["B-C-D-A","A-B-C-D","C-B-A-D","D-C-B-A"],0,"Collect data → analyse → prepare report → submit."],
["Arrange: A. It began to rain. B. We took an umbrella. C. We checked the weather forecast. D. Dark clouds appeared.",["A-D-C-B","C-D-A-B","D-C-B-A","B-A-D-C"],2,"Dark clouds prompt forecast check, then umbrella, then rain is a plausible logical sequence."],
["Choose the best opening sentence.",["This is why it is important.","They help us stay healthy.","Regular physical activity has many benefits.","For this reason, it should continue."],2,"The broad topic-introducing statement is the best opener."],
["Choose the sentence that logically follows: 'The library was renovated last month.'",["It has thousands of stars.","New shelves and reading spaces were added.","Yesterday was a holiday.","Therefore, the river flooded."],1,"The added facilities logically continue the renovation topic."],
["Choose the best word: The policy aims to ___ pollution.",["reduce","reduction","reduced","reducing"],0,"Aim to is followed by base verb."],
["Choose the best connector: The task was difficult. ___, the team completed it on time.",["Nevertheless","Because","Therefore","Since"],0,"Nevertheless introduces contrast."],
["Arrange: A. As a result, the crops failed. B. There was very little rainfall. C. Farmers faced water shortages. D. The region experienced a severe drought.",["D-B-C-A","A-C-B-D","B-D-A-C","C-A-D-B"],0,"Drought → low rainfall → shortage → crop failure."]
],["Read the whole passage before choosing cloze answers.","Use grammar clues and natural collocations; check meaning after grammar.","Para jumble: find topic opener, antecedents, connectors and chronology.","However/nevertheless signal contrast; therefore/as a result signal consequence.","Read the final sequence as one paragraph to test coherence."]),
"reading-comprehension":makeEnglishLesson("Reading Comprehension","SI English Comprehension aur Constable passage questions ke liye active reading develop karo. Main idea, details, inference, tone, purpose, vocabulary aur fact/opinion ko separate identify karna seekho.",[
["1. Main idea and theme","Main idea passage ka central message hai; supporting details usko explain karte hain. Har paragraph ka one-line summary mentally banao."],
["2. Fact and inference","Fact text mein directly stated hota hai. Inference available clues se logically supported conclusion hai—personal assumption nahi."],
["3. Tone and attitude","Tone author ka attitude hai: critical, optimistic, cautious, neutral, persuasive, humorous, concerned. Strong adjectives aur conclusion clues dete hain."],
["4. Purpose and audience","Purpose inform, explain, persuade, criticise, entertain ya compare ho sakta hai. Ask: author ne ye passage kyun likha aur kiske liye?" ],
["5. Vocabulary in context","Word ka meaning surrounding sentence, contrast, examples and overall theme se infer karo. Dictionary ka first meaning har context mein fit nahi hota."],
["6. Efficient exam method","Questions quickly scan karo, passage carefully read karo, evidence locate karo, extreme options eliminate karo. Outside knowledge ke basis par answer mat choose karo."]
],[
["Main idea","A passage describes how daily reading improves vocabulary, concentration and knowledge.","Main idea: regular reading offers several learning benefits; individual benefits are supporting details."],
["Inference","The shop lights were off and the doors were locked at 10 p.m.","It is reasonable to infer the shop was closed; the passage need not state it directly."],
["Tone","The writer acknowledges benefits but warns that careless use can cause harm.","The tone is balanced/cautious, not wholly negative."]
],[
["Passage: 'Trees absorb carbon dioxide, provide shade and support wildlife. Urban parks also offer residents space to exercise.' What is the main idea?",["Trees are useful only for shade.","Urban green spaces provide environmental and social benefits.","Exercise is the only purpose of parks.","Wildlife avoids cities."],1,"The passage combines environmental and community benefits."],
["A statement directly mentioned in a passage is a:",["prediction","fact/detail","personal belief","contradiction"],1,"A directly stated detail is a factual text detail."],
["An inference should be based on:",["personal preference","outside rumours","clues in the passage","the longest option"],2,"Inference must be logically supported by textual clues."],
["Author writes to convince readers to save water. The purpose is to:",["persuade","entertain","narrate","describe a character"],0,"Trying to convince readers is persuasion."],
["A writer calls a policy 'promising but incomplete'. The tone is best described as:",["balanced and cautious","furious","celebratory only","comic"],0,"The phrase recognises a benefit but notes a limitation."],
["Choose the best title for a passage about benefits and risks of online learning.",["The End of Education","Online Learning: Opportunities and Challenges","Only Mobile Phones","A History of Roads"],1,"A balanced title covers both benefits and risks."],
["If a passage says rainfall fell for three consecutive years and reservoirs shrank, what can be inferred?",["Water availability may have declined.","Rainfall increased.","Reservoirs created rain.","There was no change."],0,"Reduced rainfall and shrinking reservoirs support the inference."],
["The word 'conserve' in 'We must conserve water' means:",["waste","save carefully","pollute","measure"],1,"Conserve means protect or use carefully."],
["Which is an opinion?",["The library opens at 9 a.m.","The book has 200 pages.","This is the most inspiring book of the year.","The author was born in 1980."],2,"Most inspiring is a subjective judgement."],
["A passage that explains steps in planting a tree mainly aims to:",["instruct","criticise","entertain","compare elections"],0,"Step-by-step directions are instructional."],
["If an author presents both advantages and disadvantages, the passage is likely:",["one-sided","balanced","purely fictional","a list of commands"],1,"Both sides indicate a balanced discussion."],
["Which detail best supports the idea that exercise improves health?",["Regular activity strengthens the heart.","The park is painted blue.","The road is busy.","The weather changed."],0,"Heart health is directly relevant supporting evidence."],
["A passage describes events in time order. Its organisation is:",["chronological","alphabetical","random","comparative only"],0,"Chronological organisation follows time sequence."],
["What should you do when an option makes a claim stronger than the passage?",["Select it immediately","Reject or verify it against the text","Use outside knowledge","Ignore the question"],1,"Extreme or unsupported claims should be checked against text evidence."],
["The author uses statistics and examples to support a claim. These are:",["supporting evidence","the title","a question tag","unrelated opinions"],0,"Statistics and examples provide evidence for the central claim."]
],["Main idea = central message; details support it.","Fact is stated; inference is logically derived from textual clues.","Identify tone, purpose and audience from language and structure.","Use context to infer vocabulary; do not force a familiar meaning.","Answer from the passage, not outside assumptions; eliminate unsupported extremes."])
};
