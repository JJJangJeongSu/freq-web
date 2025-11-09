import { ArrowLeft, Camera, Plus, X, Search, Music, Album, Hash, Globe, Lock, Save, ImageIcon, Edit3, MessageSquare, Check, Disc, Upload } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch, SearchType } from "@/hooks/useSearch";
import { SearchResult, CreateCollectionRequest, CollectionItemInput, CreateCollectionRequestIsPublicEnum } from "@/api/models";
import { apiService } from "@/services/api.service";
import { useToast } from "@/hooks/use-toast";

// 장르 리스트 (genres.md에서 추출)
const GENRE_LIST = [
  "A Cappella", "Abstract", "Abstract Beats", "Abstract Hip Hop", "Abstract Idm", "Abstractro", "Accordion", "Acid House", "Acid Jazz", "Acid Techno", "Acousmatic", "Acoustic Blues", "Acoustic Pop", "Adult Standards", "African Percussion", "African Rock", "Afrikaans", "Afrobeat", "Afrobeats", "Aggrotech", "Albanian Pop", "Album Rock", "Albuquerque Indie", "Alternative Americana", "Alternative Country", "Alternative Dance", "Alternative Emo", "Alternative Hardcore", "Alternative Hip Hop", "Alternative Metal", "Alternative Metalcore", "Alternative New Age", "Alternative Pop", "Alternative Pop Rock", "Alternative R&b", "Alternative Rock", "Alternative Roots Rock", "Ambeat", "Ambient", "Ambient Dub Techno", "Ambient Fusion", "Ambient Idm", "Ambient Psychill", "Ambient Trance", "Anarcho-punk", "Andean", "Anime", "Anime Score", "Anti-folk", "Antiviral Pop", "Appalachian Folk", "Arab Folk", "Arab Pop", "Arabesk", "Argentine Indie", "Argentine Reggae", "Argentine Rock", "Armenian Folk", "Art Rock", "Athens Indie", "Atmospheric Black Metal", "Atmospheric Post Rock", "Atmospheric Post-metal", "Aussietronica", "Austindie", "Australian Alternative Rock", "Australian Country", "Australian Dance", "Australian Hip Hop", "Australian Indie", "Australian Pop", "Austrian Hip Hop", "Austropop", "Avant-garde", "Avant-garde Jazz", "Avantgarde Metal", "Axe", "Azonto", "Bachata", "Baile Funk", "Balearic", "Balkan Brass", "Banda", "Bangla", "Barbershop", "Barnemusikk", "Barnmusik", "Baroque", "Baroque Ensemble", "Basque Rock", "Bass Music", "Bass Trip", "Bassline", "Bay Area Hip Hop", "Beach Music", "Beatdown", "Beats & Rhymes", "Bebop", "Belgian Indie", "Belgian Rock", "Belly Dance", "Belorush", "Bemani", "Benga", "Bhangra", "Big Band", "Big Beat", "Big Room", "Black Death", "Black Metal", "Black Sludge", "Black Thrash", "Blackgaze", "Blaskapelle", "Bluegrass", "Blues", "Blues-rock", "Blues-rock Guitar", "Bmore", "Bolero", "Boogaloo", "Boogie-woogie", "Bossa Nova", "Bossa Nova Jazz", "Boston Rock", "Bounce", "Bouncy House", "Bow Pop", "Boy Band", "Brass Band", "Brass Ensemble", "Brazilian Composition", "Brazilian Gospel", "Brazilian Hip Hop", "Brazilian Indie", "Brazilian Pop Music", "Brazilian Punk", "Breakbeat", "Breakcore", "Breaks", "Brega", "Breton Folk", "Brill Building Pop", "British Alternative Rock", "British Blues", "British Brass Band", "British Dance Band", "British Folk", "British Indie Rock", "British Invasion", "Britpop", "Broadway", "Broken Beat", "Brooklyn Indie", "Brostep", "Brutal Death Metal", "Brutal Deathcore", "Bubble Trance", "Bubblegum Dance", "Bubblegum Pop", "Bulgarian Rock", "Byzantine", "C-pop", "C64", "C86", "Cabaret", "Cajun", "Calypso", "Canadian Country", "Canadian Hip Hop", "Canadian Indie", "Canadian Metal", "Canadian Pop", "Candy Pop", "Cantautor", "Cante Flamenco", "Canterbury Scene", "Cantopop", "Canzone Napoletana", "Capoeira", "Carnatic", "Catstep", "Caucasian Folk", "Ccm", "Ceilidh", "Cello", "Celtic", "Celtic Christmas", "Celtic Punk", "Celtic Rock", "Central Asian Folk", "Chalga", "Chamber Pop", "Chanson", "Chanson Quebecois", "Chaotic Black Metal", "Chaotic Hardcore", "Charred Death", "Chicago Blues", "Chicago House", "Chicago Indie", "Chicago Soul", "Chicano Rap", "Children's Christmas", "Children's Music", "Chilean Rock", "Chill Groove", "Chill Lounge", "Chill-out", "Chill-out Trance", "Chillstep", "Chillwave", "Chinese Indie Rock", "Chinese Opera", "Chinese Traditional", "Chip Hop", "Chiptune", "Choral", "Choro", "Christian Alternative Rock", "Christian Christmas", "Christian Dance", "Christian Hardcore", "Christian Hip Hop", "Christian Metal", "Christian Music", "Christian Punk", "Christian Rock", "Christmas", "Christmas Product", "Cinematic Dubstep", "Clarinet", "Classic Afrobeat", "Classic Belgian Pop", "Classic Chinese Pop", "Classic Colombian Pop", "Classic Czech Pop", "Classic Danish Pop", "Classic Dutch Pop", "Classic Eurovision", "Classic Finnish Pop", "Classic Finnish Rock", "Classic French Pop", "Classic Funk Rock", "Classic Garage Rock", "Classic Italian Pop", "Classic Norwegian Pop", "Classic Peruvian Pop", "Classic Polish Pop", "Classic Psychedelic Rock", "Classic Rock", "Classic Russian Pop", "Classic Russian Rock", "Classic Schlager", "Classic Soundtrack", "Classic Swedish Pop", "Classic Turkish Pop", "Classic Venezuelan Pop", "Classical", "Classical Christmas", "Classical Flute", "Classical Guitar", "Classical Organ", "Classical Performance", "Classical Period", "Classical Piano", "College A Cappella", "College Marching Band", "Colombian Rock", "Columbus Ohio Indie", "Comedy", "Comedy Rock", "Comic", "Commons", "Complextro", "Composition D", "Concert Piano", "Consort", "Contemporary Classical", "Contemporary Country", "Contemporary Folk", "Contemporary Jazz", "Contemporary Post-bop", "Cool Jazz", "Corrosion", "Corsican Folk", "Country", "Country Blues", "Country Christmas", "Country Dawn", "Country Gospel", "Country Road", "Country Rock", "Coupe Decale", "Coverchill", "Covertrance", "Cowboy Western", "Cowpunk", "Crack Rock Steady", "Croatian Pop", "Crossover Prog", "Crossover Thrash", "Crunk", "Crust Punk", "Cryptic Black Metal", "Cuban Rumba", "Cubaton", "Cumbia", "Cumbia Funk", "Cumbia Sonidera", "Cumbia Villera", "Cyber Metal", "Czech Folk", "Czech Rock", "Dallas Indie", "Dance Pop", "Dance Rock", "Dance-punk", "Dancehall", "Dangdut", "Danish Hip Hop", "Danish Indie", "Danish Jazz", "Danish Pop", "Danish Pop Rock", "Dansband", "Danseband", "Dansktop", "Dark Ambient", "Dark Black Metal", "Dark Cabaret", "Dark Electro-industrial", "Dark Hardcore", "Dark Jazz", "Dark Minimal Techno", "Dark Progressive House", "Dark Psytrance", "Dark Wave", "Darkstep", "Death Core", "Death Metal", "Deathgrind", "Deep Acoustic Pop", "Deep Adult Standards", "Deep Alternative R&b", "Deep Ambient", "Deep Baroque", "Deep Brazilian Pop", "Deep Breakcore", "Deep Canadian Indie", "Deep Ccm", "Deep Cello", "Deep Chill", "Deep Chill-out", "Deep Christian Rock", "Deep Classic Garage Rock", "Deep Classical Piano", "Deep Comedy", "Deep Contemporary Country", "Deep Dance Pop", "Deep Darkpsy", "Deep Deep House", "Deep Deep Tech House", "Deep Delta Blues", "Deep Disco", "Deep Disco House", "Deep Discofox", "Deep Downtempo Fusion", "Deep Dub Techno", "Deep East Coast Hip Hop", "Deep Euro House", "Deep Eurodance", "Deep Filthstep", "Deep Flow", "Deep Folk Metal", "Deep Free Jazz", "Deep Freestyle", "Deep Full On", "Deep Funk", "Deep Funk House", "Deep G Funk", "Deep German Indie", "Deep German Punk", "Deep Gothic Post-punk", "Deep Happy Hardcore", "Deep Hardcore", "Deep Hardcore Punk", "Deep Hardstyle", "Deep House", "Deep Indian Pop", "Deep Indie Pop", "Deep Indie Rock", "Deep Indie Singer-songwriter", "Deep Italo Disco", "Deep Jazz Fusion", "Deep Jazz Guitar", "Deep Jazz Piano", "Deep Latin Alternative", "Deep Liquid", "Deep Liquid Bass", "Deep Melodic Death Metal", "Deep Melodic Hard Rock", "Deep Melodic House", "Deep Melodic Metalcore", "Deep Minimal Techno", "Deep Motown", "Deep Neo-synthpop", "Deep Neofolk", "Deep New Wave", "Deep Nordic Folk", "Deep Northern Soul", "Deep Opera", "Deep Orchestral", "Deep Orgcore", "Deep Pop Emo", "Deep Pop Punk", "Deep Power-pop Punk", "Deep Progressive House", "Deep Progressive Trance", "Deep Psychobilly", "Deep Psytrance", "Deep Punk Rock", "Deep Ragga", "Deep Rai", "Deep Regional Mexican", "Deep Smooth Jazz", "Deep Soft Rock", "Deep Soul House", "Deep Soundtrack", "Deep Southern Soul", "Deep Space Rock", "Deep String Quartet", "Deep Sunset Lounge", "Deep Surf Music", "Deep Symphonic Black Metal", "Deep Talent Show", "Deep Tech House", "Deep Thrash Metal", "Deep Trap", "Deep Turkish Pop", "Deep Uplifting Trance", "Deep Vocal House", "Deep Vocal Jazz", "Delta Blues", "Demoscene", "Denver Indie", "Depressive Black Metal", "Desert Blues", "Desi", "Destroy Techno", "Detroit Hip Hop", "Detroit Techno", "Didgeridoo", "Digital Hardcore", "Dirty South Rap", "Dirty Texas Rap", "Disco", "Disco House", "Discofox", "Dixieland", "Djent", "Dominican Pop", "Doo-wop", "Doom Metal", "Doomcore", "Doujin", "Downtempo", "Downtempo Fusion", "Downtempo Trip Hop", "Drama", "Dream Pop", "Dreamo", "Drill And Bass", "Drone", "Drone Folk", "Drone Metal", "Drone Psych", "Drum And Bass", "Drumfunk", "Dub", "Dub Techno", "Dubstep", "Dubstep Product", "Dubsteppe", "Duranguense", "Dutch Hip Hop", "Dutch House", "Dutch Pop", "Dutch Rock", "E6fi", "Early Music", "Early Music Ensemble", "East Coast Hip Hop", "Easy Listening", "Ebm", "Ectofolk", "Ecuadoria", "Edm", "Electric Blues", "Electro", "Electro Dub", "Electro House", "Electro Jazz", "Electro Latino", "Electro Swing", "Electro Trash", "Electro-industrial", "Electroacoustic Improvisation", "Electroclash", "Electrofox", "Electronic", "Electronica", "Electronicore", "Electropowerpop", "Electropunk", "Emo", "Emo Punk", "Enka", "Entehno", "Environmental", "Epicore", "Estonian Pop", "Ethereal Gothic", "Ethereal Wave", "Etherpop", "Ethiopian Pop", "Eurobeat", "Eurodance", "Europop", "Euroska", "Eurovision", "Exotica", "Experimental", "Experimental Dubstep", "Experimental Psych", "Experimental Rock", "Fado", "Fake", "Fallen Angel", "Faroese Pop", "Fast Melodic Punk", "Fidget House", "Filmi", "Filter House", "Filthstep", "Fingerstyle", "Finnish Hardcore", "Finnish Hip Hop", "Finnish Indie", "Finnish Jazz", "Finnish Metal", "Finnish Pop", "Flamenco", "Flick Hop", "Folk", "Folk Christmas", "Folk Metal", "Folk Punk", "Folk Rock", "Folk-pop", "Folk-prog", "Folklore Argentino", "Folkmusik", "Footwork", "Forro", "Fourth World", "Freak Folk", "Freakbeat", "Free Improvisation", "Free Jazz", "Freestyle", "French Folk", "French Folk Pop", "French Hip Hop", "French Indie Pop", "French Movie Tunes", "French Pop", "French Punk", "French Reggae", "French Rock", "Full On", "Funeral Doom", "Funk", "Funk Carioca", "Funk Metal", "Funk Rock", "Funky Breaks", "Future Ambient", "Future Garage", "Futurepop", "G Funk", "Gabba", "Galego", "Gamecore", "Gamelan", "Gangster Rap", "Garage Pop", "Garage Punk", "Garage Punk Blues", "Garage Rock", "Gauze Pop", "Gbvfi", "Geek Folk", "Geek Rock", "German Ccm", "German Hip Hop", "German Indie", "German Metal", "German Oi", "German Pop", "German Pop Rock", "German Punk", "German Show Tunes", "German Techno", "Ghettotech", "Ghoststep", "Girl Group", "Glam Metal", "Glam Rock", "Glitch", "Glitch Beats", "Glitch Hop", "Glitter Trance", "Goa Trance", "Goregrind", "Gospel", "Gospel Blues", "Gospel Reggae", "Gothic Alternative", "Gothic Americana", "Gothic Doom", "Gothic Metal", "Gothic Post-punk", "Gothic Rock", "Gothic Symphonic Metal", "Grave Wave", "Greek Hip Hop", "Greek House", "Greek Indie", "Grim Death Metal", "Grime", "Grindcore", "Grisly Death Metal", "Groove Metal", "Grunge", "Grunge Pop", "Grupera", "Guidance", "Gypsy Jazz", "Hands Up", "Happy Hardcore", "Hard Alternative", "Hard Bop", "Hard Glam", "Hard House", "Hard Rock", "Hard Stoner Rock", "Hard Trance", "Hardcore", "Hardcore Breaks", "Hardcore Hip Hop", "Hardcore Punk", "Hardcore Techno", "Hardstyle", "Harmonica Blues", "Harp", "Hatecore", "Hauntology", "Hawaiian", "Healing", "Heavy Alternative", "Heavy Christmas", "Heavy Gothic Rock", "Hi Nrg", "Highlife", "Hindustani Classical", "Hip Hop", "Hip Hop Quebecois", "Hip Hop Tuga", "Hip House", "Hip Pop", "Hiplife", "Hoerspiel", "Hollywood", "Honky Tonk", "Horror Punk", "Horrorcore", "House", "Hungarian Hip Hop", "Hungarian Pop", "Hungarian Rock", "Hurban", "Hyphy", "Icelandic Pop", "Idol", "Illbient", "Indian Classical", "Indian Pop", "Indian Rock", "Indie Christmas", "Indie Dream Pop", "Indie Emo", "Indie Emo Rock", "Indie Folk", "Indie Fuzzpop", "Indie Pop", "Indie Pop Rock", "Indie Post-punk", "Indie Psych-pop", "Indie R&b", "Indie Rock", "Indie Shoegaze", "Indie Singer-songwriter", "Indietronica", "Indonesian Indie", "Indonesian Pop", "Indorock", "Industrial", "Industrial Metal", "Industrial Rock", "Instrumental Post Rock", "Intelligent Dance Music", "Irish Folk", "Irish Indie", "Irish Rock", "Iskelma", "Islamic Recitation", "Israeli Rock", "Italian Disco", "Italian Folk", "Italian Hip Hop", "Italian Indie Pop", "Italian Jazz", "Italian Pop", "Italian Pop Rock", "Italian Progressive Rock", "Italian Punk", "Italo Dance", "J-alt", "J-ambient", "J-core", "J-dance", "J-idol", "J-indie", "J-metal", "J-pop", "J-poppunk", "J-poprock", "J-punk", "J-rap", "J-rock", "J-theme", "Jam Band", "Jangle Pop", "Jangle Rock", "Japanese Jazztronica", "Japanese Psychedelic", "Japanese R&b", "Japanese Standards", "Japanese Traditional", "Japanoise", "Jazz", "Jazz Bass", "Jazz Blues", "Jazz Brass", "Jazz Christmas", "Jazz Funk", "Jazz Fusion", "Jazz Metal", "Jazz Orchestra", "Jazz Trio", "Jerk", "Jig And Reel", "Judaica", "Jug Band", "Juggalo", "Jump Blues", "Jump Up", "Jumpstyle", "Jungle", "K-hop", "K-indie", "K-pop", "K-rock", "Kabarett", "Karneval", "Kc Indie", "Kindermusik", "Kirtan", "Kiwi Rock", "Kizomba", "Klapa", "Klezmer", "Kompa", "Kraut Rock", "Kuduro", "Kurdish Folk", "Kwaito", "La Indie", "Laboratorio", "Laiko", "Latin", "Latin Alternative", "Latin Christian", "Latin Christmas", "Latin Electronica", "Latin Hip Hop", "Latin Jazz", "Latin Metal", "Latin Pop", "Latvian Pop", "Lds", "Leeds Indie", "Levenslied", "Liedermacher", "Light Music", "Lilith", "Liquid Funk", "Lithumania", "Liturgical", "Lo Star", "Lo-fi", "Louisiana Blues", "Louisville Indie", "Lounge", "Lounge House", "Lovers Rock", "Lowercase", "Luk Thung", "Madchester", "Maghreb", "Magyar", "Makossa", "Malagasy Folk", "Malaysian Pop", "Mallet", "Mambo", "Mande Pop", "Mandopop", "Manele", "Marching Band", "Mariachi", "Martial Industrial", "Mashup", "Math Pop", "Math Rock", "Mathcore", "Mbalax", "Medieval", "Medieval Rock", "Meditation", "Melancholia", "Melbourne Bounce", "Mellow Gold", "Melodic Death Metal", "Melodic Hard Rock", "Melodic Hardcore", "Melodic Metalcore", "Melodic Power Metal", "Melodic Progressive Metal", "Memphis Blues", "Memphis Hip Hop", "Memphis Soul", "Merengue", "Merengue Urbano", "Merseybeat", "Metal", "Metal Guitar", "Metalcore", "Metropopolis", "Mexican Indie", "Mexican Rock-and-roll", "Mexican Son", "Mexican Traditional", "Miami Bass", "Michigan Indie", "Microhouse", "Military Band", "Minimal", "Minimal Dub", "Minimal Dubstep", "Minimal Melodic Techno", "Minimal Tech House", "Minimal Techno", "Minimal Wave", "Mizrahi", "Mod Revival", "Modern Blues", "Modern Classical", "Modern Country Rock", "Modern Downshift", "Modern Free Jazz", "Modern Performance", "Modern Southern Rock", "Modern Uplift", "Monastic", "Moombahton", "Morna", "Motivation", "Motown", "Movie Tunes", "Mpb", "Musica Para Ninos", "Musiikkia Lapsille", "Musique Concrete", "Musique Pour Enfants", "Muziek Voor Kinderen", "Nasheed", "Nashville Sound", "Native American", "Necrogrind", "Neo Classical Metal", "Neo Honky Tonk", "Neo Mellow", "Neo Metal", "Neo Soul", "Neo Soul-jazz", "Neo-industrial Rock", "Neo-pagan", "Neo-progressive", "Neo-psychedelic", "Neo-rockabilly", "Neo-singer-songwriter", "Neo-synthpop", "Neo-trad Metal", "Neo-traditional Country", "Neoclassical", "Neofolk", "Nepali", "Nerdcore", "Neue Deutsche Harte", "Neue Deutsche Welle", "Neurofunk", "Neurostep", "New Age", "New Age Piano", "New Americana", "New Beat", "New Jack Smooth", "New Jack Swing", "New Orleans Blues", "New Orleans Jazz", "New Rave", "New Romantic", "New Tribe", "New Wave", "New Wave Pop", "New Weird America", "Ninja", "Nintendocore", "Nl Folk", "No Wave", "Noise", "Noise Pop", "Noise Punk", "Noise Rock", "Nordic Folk", "Nordic House", "Norteno", "Northern Irish Indie", "Northern Soul", "Norwegian Gospel", "Norwegian Hip Hop", "Norwegian Jazz", "Norwegian Metal", "Norwegian Pop", "Norwegian Punk", "Norwegian Rock", "Nu Age", "Nu Disco", "Nu Electro", "Nu Gaze", "Nu Jazz", "Nu Metal", "Nu Skool Breaks", "Nu-cumbia", "Nueva Cancion", "Nursery", "Nwobhm", "Nwothm", "Nz Indie", "Oi", "Old School Hip Hop", "Old-time", "Opera", "Operatic Pop", "Opm", "Oratory", "Orchestral", "Organic Ambient", "Orgcore", "Orquesta Tipica", "Orquesta Tropical", "Oshare Kei", "Ostrock", "Outer Hip Hop", "Outlaw Country", "Outsider", "Outsider House", "P Funk", "Pagan Black Metal", "Pagode", "Pakistani Pop", "Permanent Wave", "Persian Pop", "Persian Traditional", "Perth Indie", "Peruvian Rock", "Piano Blues", "Piano Rock", "Piedmont Blues", "Pipe Band", "Poetry", "Polish Hip Hop", "Polish Indie", "Polish Jazz", "Polish Pop", "Polish Punk", "Polish Reggae", "Polka", "Polynesian Pop", "Polyphony", "Pop", "Pop Christmas", "Pop Emo", "Pop House", "Pop Punk", "Pop Rap", "Pop Rock", "Popgaze", "Porro", "Portland Indie", "Portuguese Pop", "Portuguese Rock", "Post Rock", "Post-disco", "Post-disco Soul", "Post-grunge", "Post-hardcore", "Post-metal", "Post-post-hardcore", "Post-punk", "Power Blues-rock", "Power Electronics", "Power Metal", "Power Noise", "Power Pop", "Power Violence", "Power-pop Punk", "Praise", "Progressive Alternative", "Progressive Bluegrass", "Progressive Electro House", "Progressive House", "Progressive Metal", "Progressive Psytrance", "Progressive Rock", "Progressive Trance", "Progressive Trance House", "Progressive Uplifting Trance", "Protopunk", "Psych Gaze", "Psychedelic Blues-rock", "Psychedelic Rock", "Psychedelic Trance", "Psychill", "Psychobilly", "Pub Rock", "Puerto Rican Rock", "Punjabi", "Punk", "Punk Blues", "Punk Christmas", "Punk Ska", "Qawwali", "Quebecois", "Quiet Storm", "R&b", "Ragga Jungle", "Ragtime", "Rai", "Ranchera", "Rap", "Rap Metal", "Rap Metalcore", "Rap Rock", "Raw Black Metal", "Re:techno", "Reading", "Rebetiko", "Reggae", "Reggae Fusion", "Reggae Rock", "Reggaeton", "Regional Mexican", "Relaxative", "Remix", "Renaissance", "Retro Electro", "Retro Metal", "Rhythm And Boogie", "Riddim", "Rio De La Plata", "Riot Grrrl", "Rock", "Rock Catala", "Rock En Espanol", "Rock Gaucho", "Rock Noise", "Rock Steady", "Rock-and-roll", "Rockabilly", "Romanian Pop", "Romanian Rock", "Romantic", "Roots Reggae", "Roots Rock", "Rumba", "Russian Alternative", "Russian Hip Hop", "Russian Pop", "Russian Punk", "Russian Rock", "Rva Indie", "Salsa", "Salsa International", "Samba", "Saxophone", "Schlager", "Schranz", "Scorecore", "Scottish Rock", "Scratch", "Screamo", "Screamo Punk", "Screamocore", "Seattle Indie", "Sega", "Serialism", "Sertanejo", "Sertanejo Tradicional", "Sertanejo Universitario", "Sevdah", "Shanty", "Sheffield Indie", "Shibuya-kei", "Shimmer Pop", "Shimmer Psych", "Shiver Pop", "Shoegaze", "Show Tunes", "Singaporean Pop", "Singer-songwriter", "Sinhala", "Ska", "Ska Punk", "Ska Revival", "Skate Punk", "Skiffle", "Skinhead Oi", "Skinhead Reggae", "Skweee", "Slam Death Metal", "Slash Punk", "Slc Indie", "Sleaze Rock", "Sleep", "Slovak Hip Hop", "Slovak Pop", "Slovenian Rock", "Slow Core", "Sludge Metal", "Smooth Jazz", "Smooth Urban R&b", "Soca", "Soda Pop", "Soft Rock", "Solipsynthm", "Soukous", "Soul", "Soul Blues", "Soul Christmas", "Soul Flow", "Soul Jazz", "Soundtrack", "South African Jazz", "Southern Gospel", "Southern Hip Hop", "Southern Rock", "Southern Soul", "Southern Soul Blues", "Space Rock", "Spanish Classical", "Spanish Folk", "Spanish Hip Hop", "Spanish Indie Pop", "Spanish Indie Rock", "Spanish Invasion", "Spanish New Wave", "Spanish Pop", "Spanish Pop Rock", "Spanish Punk", "Spanish Reggae", "Speed Garage", "Speed Metal", "Speedcore", "Spoken Word", "Spytrack", "Steampunk", "Steelpan", "Stl Indie", "Stomp And Flutter", "Stomp And Holler", "Stomp And Whittle", "Stomp Pop", "Stoner Metal", "Stoner Rock", "Straight Edge", "Street Punk", "Stride", "String Band", "String Folk", "String Quartet", "Substep", "Sunset Lounge", "Suomi Rock", "Surf Music", "Swamp Blues", "Swamp Pop", "Swedish Alternative Rock", "Swedish Hard Rock", "Swedish Hip Hop", "Swedish Indie Pop", "Swedish Indie Rock", "Swedish Jazz", "Swedish Metal", "Swedish Pop", "Swedish Pop Punk", "Swedish Prog", "Swedish Punk", "Swedish Reggae", "Swedish Soft Pop", "Swedish Synthpop", "Swing", "Swirl Psych", "Swiss Folk", "Swiss Hip Hop", "Swiss Rock", "Symphonic Black Metal", "Symphonic Metal", "Symphonic Rock", "Synthpop", "Taiwanese Pop", "Talent Show", "Tango", "Tech House", "Technical Brutal Death Metal", "Technical Death Metal", "Techno", "Teen Pop", "Tejano", "Tekno", "Terrorcore", "Texas Blues", "Texas Country", "Thai Indie", "Thai Pop", "Thrash Core", "Thrash Metal", "Thrash-groove Metal", "Throat Singing", "Tibetan", "Tico", "Timba", "Tin Pan Alley", "Traditional Blues", "Traditional British Folk", "Traditional Country", "Traditional Folk", "Traditional Funk", "Traditional Irish Folk", "Traditional Reggae", "Traditional Rock 'N Roll", "Traditional Rockabilly", "Traditional Scottish Folk", "Traditional Ska", "Traditional Soul", "Traditional Swing", "Trance", "Trance Hop", "Trap Music", "Trapstep", "Trash Rock", "Triangle Indie", "Tribal House", "Tribute", "Trip Hop", "Tropical", "Trova", "Turbo Folk", "Turkish Alternative", "Turkish Classical", "Turkish Folk", "Turkish Hip Hop", "Turkish Jazz", "Turkish Pop", "Turkish Rock", "Turntablism", "Twee Indie Pop", "Twee Pop", "Twin Cities Indie", "Tzadik", "Uk Dub", "Uk Garage", "Uk Hip Hop", "Uk Post-punk", "Ukrainian Rock", "Ukulele", "Unblack Metal", "Underground Hip Hop", "Underground Latin Hip Hop", "Underground Pop Rap", "Underground Power Pop", "Underground Rap", "Uplifting Trance", "Urban Contemporary", "Vallenato", "Vancouver Indie", "Vapor House", "Vaporwave", "Vegan Straight Edge", "Vegas Indie", "Velha Guarda", "Venezuelan Rock", "Video Game Music", "Vienna Indie", "Vietnamese Pop", "Viking Metal", "Vintage Chanson", "Vintage Country Folk", "Vintage Gospel", "Vintage Jazz", "Vintage Reggae", "Vintage Rockabilly", "Vintage Schlager", "Vintage Swedish Pop", "Vintage Swing", "Vintage Swoon", "Vintage Tango", "Vintage Western", "Violin", "Viral Pop", "Visual Kei", "Vocal House", "Vocal Jazz", "Vocaloid", "Volksmusik", "Warm Drone", "Welsh Rock", "West African Jazz", "West Coast Rap", "Western Swing", "Wind Ensemble", "Witch House", "Wonky", "Workout", "World", "World Chill", "World Christmas", "World Fusion", "Worship", "Wrestling", "Wrock", "Ye Ye", "Yoik", "Yugoslav Rock", "Zeuhl", "Zillertal", "Zim", "Zolo", "Zouglou", "Zouk", "Zydeco"
];

export function CreateCollectionPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // 커버 이미지 옵션
  const coverOptions = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1672847900914-3fbd4fa39037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBsYXlsaXN0JTIwY292ZXIlMjBpbWFnZXxlbnwxfHx8fDE3NTg3MDI4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: '바이올렛 그라데이션'
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1724052177913-6c181f3abf29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG11c2ljJTIwYWxidW0lMjBjb3ZlcnxlbnwxfHx8fDE3NTg3MDI4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: '추상적 패턴'
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1736176421274-546a4eaf57d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFic3RyYWN0JTIwZ3JhZGllbnQlMjBtdXNpY3xlbnwxfHx8fDE3NTg3MDI4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      name: '무지개 그라데이션'
    }
  ];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'albums' as 'albums' | 'tracks' | 'mixed',
    isPublic: true,
    coverImage: coverOptions[0].url // 기본값으로 첫 번째 이미지 설정
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showGenreSuggestions, setShowGenreSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [selectedMusic, setSelectedMusic] = useState<SearchResult[]>([]);
  const [musicDescriptions, setMusicDescriptions] = useState<Record<string, string>>({});
  const [editingDescription, setEditingDescription] = useState<string | null>(null);
  const [tempDescription, setTempDescription] = useState('');

  // 검색 관련 state
  const [musicSearchQuery, setMusicSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('album');
  const { data: searchData, loading: searchLoading, error: searchError, search } = useSearch();

  // 저장 상태
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // 이미지 업로드 상태
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  // 장르 필터링 - 정확도 기반 정렬
  const filteredGenres = React.useMemo(() => {
    const query = tagInput.trim();
    if (query.length === 0) return [];

    const queryLower = query.toLowerCase();

    // 장르별 정확도 점수 계산
    const scored = GENRE_LIST
      .map(genre => {
        const genreLower = genre.toLowerCase();
        let score = 0;

        // 1. 완전 일치 (최우선)
        if (genreLower === queryLower) {
          score = 1000;
        }
        // 2. 시작 일치
        else if (genreLower.startsWith(queryLower)) {
          score = 500;
        }
        // 3. 단어 시작 일치 (공백, 하이픈 뒤)
        else if (genreLower.includes(' ' + queryLower) || genreLower.includes('-' + queryLower)) {
          score = 100;
        }
        // 4. 포함
        else if (genreLower.includes(queryLower)) {
          score = 10;
        }
        // 매칭되지 않으면 null 반환
        else {
          return null;
        }

        // 추가 보너스: 입력 길이 대비 장르 이름 길이 (짧을수록 더 관련성 높음)
        score += (1 - genre.length / 100) * 5;

        return { genre, score };
      })
      .filter((item): item is { genre: string; score: number } => item !== null)
      .sort((a, b) => b.score - a.score) // 점수 높은 순으로 정렬
      .slice(0, 10) // 상위 10개만
      .map(item => item.genre);

    return scored;
  }, [tagInput]);

  // 검색 타입 변경 시 컬렉션 타입에 맞게 제한
  useEffect(() => {
    if (formData.type === 'albums') {
      setSearchType('album');
    } else if (formData.type === 'tracks') {
      setSearchType('track');
    }
  }, [formData.type]);

  // 검색어 변경 시 디바운스 처리하여 API 호출
  useEffect(() => {
    if (musicSearchQuery.trim().length === 0) {
      return;
    }

    const timeoutId = setTimeout(() => {
      search(musicSearchQuery, searchType);
    }, 500); // 500ms 디바운스

    return () => clearTimeout(timeoutId);
  }, [musicSearchQuery, searchType]);

  const handleAddTag = (genre?: string) => {
    const tagToAdd = genre || tagInput.trim();
    if (tagToAdd && !tags.includes(tagToAdd) && tags.length < 5) {
      setTags([...tags, tagToAdd]);
      setTagInput('');
      setShowGenreSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleSelectGenre = (genre: string) => {
    handleAddTag(genre);
    tagInputRef.current?.focus();
  };

  const handleTagInputChange = (value: string) => {
    setTagInput(value);
    setShowGenreSuggestions(value.trim().length > 0);
    setSelectedSuggestionIndex(-1);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev =>
        prev < filteredGenres.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedSuggestionIndex >= 0 && filteredGenres[selectedSuggestionIndex]) {
        handleSelectGenre(filteredGenres[selectedSuggestionIndex]);
      } else {
        handleAddTag();
      }
    } else if (e.key === 'Escape') {
      setShowGenreSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddMusic = (music: SearchResult) => {
    if (!selectedMusic.find(item => item.id === music.id)) {
      setSelectedMusic([...selectedMusic, music]);
    }
  };

  const handleRemoveMusic = (musicId: string) => {
    setSelectedMusic(selectedMusic.filter(item => item.id !== musicId));
  };

  const handleEditDescription = (musicId: string) => {
    setEditingDescription(musicId);
    setTempDescription(musicDescriptions[musicId] || '');
  };

  const handleSaveDescription = (musicId: string) => {
    setMusicDescriptions({
      ...musicDescriptions,
      [musicId]: tempDescription
    });
    setEditingDescription(null);
    setTempDescription('');
  };

  const handleCancelEdit = () => {
    setEditingDescription(null);
    setTempDescription('');
  };

  /**
   * 파일 선택 다이얼로그 열기
   */
  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };

  /**
   * 파일 선택 및 업로드
   */
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 타입 검증
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setUploadError('JPEG, PNG, GIF 형식의 이미지만 업로드 가능합니다.');
      return;
    }

    // 파일 크기 검증 (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    try {
      setIsUploadingImage(true);
      setUploadError(null);

      // API 호출
      const response = await apiService.utilities.uploadImage(file);

      console.log('✅ 이미지 업로드 성공:', response.data);

      // 업로드된 이미지 URL 설정
      if (response.data.data?.imageUrl) {
        setFormData({
          ...formData,
          coverImage: response.data.data.imageUrl
        });
      }
    } catch (error: any) {
      console.error('❌ 이미지 업로드 실패:', error);

      const errorMessage = error.response?.data?.error?.message
        || error.message
        || '이미지 업로드 중 오류가 발생했습니다.';

      setUploadError(errorMessage);
    } finally {
      setIsUploadingImage(false);
      // input 초기화 (같은 파일을 다시 선택할 수 있도록)
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  /**
   * SearchResult를 CollectionItemInput으로 변환
   */
  const convertToCollectionItem = (music: SearchResult): any => {
    // 주의: OpenAPI 스펙 정의는 type을 integer로 명시했지만,
    // 실제 API 예제와 서버 구현은 "track", "album" 문자열을 사용함
    // 따라서 문자열로 전송
    return {
      type: music.type, // "album" 또는 "track" 문자열 그대로 사용
      id: music.id,
      title: music.title,
      description: musicDescriptions[music.id] || undefined,
      coverUrl: music.imageUrl,
      artists: music.artist ? [music.artist] : []
    };
  };

  const handleSave = async () => {
    // 유효성 검사
    if (!formData.title.trim()) {
      toast({
        variant: "destructive",
        title: "제목을 입력해주세요",
        description: "컬렉션 제목은 필수 항목입니다.",
      });
      return;
    }

    if (selectedMusic.length === 0) {
      toast({
        variant: "destructive",
        title: "음악을 추가해주세요",
        description: "최소 1개 이상의 음악을 추가해야 합니다.",
      });
      return;
    }

    if (!formData.coverImage) {
      toast({
        variant: "destructive",
        title: "커버 이미지를 선택해주세요",
        description: "컬렉션 커버 이미지는 필수 항목입니다.",
      });
      return;
    }

    try {
      setIsSaving(true);
      setSaveError(null);

      // Request body 구성
      const requestBody: CreateCollectionRequest = {
        title: formData.title,
        description: formData.description,
        isPublic: formData.isPublic
          ? CreateCollectionRequestIsPublicEnum.Public
          : CreateCollectionRequestIsPublicEnum.Private,
        coverImageUrl: formData.coverImage,
        items: selectedMusic.map(convertToCollectionItem),
        tags: tags.length > 0 ? tags : undefined
      };

      // API 호출
      const response = await apiService.collections.createCollection(requestBody);

      console.log('✅ 컬렉션 생성 성공:', response.data);

      // 성공 알림
      toast({
        title: "컬렉션이 생성되었습니다! 🎉",
        description: `"${formData.title}" 컬렉션이 성공적으로 생성되었습니다.`,
      });

      // 성공 후 이전 페이지로 이동
      setTimeout(() => {
        navigate('/rate-record');
      }, 1000);
    } catch (error: any) {
      console.error('❌ 컬렉션 생성 실패:', error);

      // 에러 메시지 추출
      const errorMessage = error.response?.data?.error?.message
        || error.message
        || '컬렉션 생성 중 오류가 발생했습니다.';

      setSaveError(errorMessage);
      toast({
        variant: "destructive",
        title: "컬렉션 생성 실패",
        description: errorMessage,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // 검색 결과를 단일 배열로 통합
  const searchResults: SearchResult[] = searchData
    ? [...(searchData.albums || []), ...(searchData.tracks || [])]
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          disabled={isSaving}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">새 컬렉션 만들기</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          disabled={!formData.title.trim() || isSaving}
        >
          {isSaving ? (
            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            <Save className="w-4 h-4" />
          )}
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* 기본 정보 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium">기본 정보</h3>
            
            {/* 제목 */}
            <div className="space-y-2">
              <Label htmlFor="title">컬렉션 제목 *</Label>
              <Input
                id="title"
                placeholder="컬렉션 제목을 입력하세요"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                maxLength={50}
              />
              <p className="text-xs text-muted-foreground">{formData.title.length}/50</p>
            </div>

            {/* 설명 */}
            <div className="space-y-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                placeholder="이 컬렉션에 대해 설명해주세요"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                maxLength={200}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">{formData.description.length}/200</p>
            </div>

            {/* 컬렉션 타입 */}
            <div className="space-y-2">
              <Label>컬렉션 타입</Label>
              <Select value={formData.type} onValueChange={(value: 'albums' | 'tracks' | 'mixed') => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="albums">앨범만</SelectItem>
                  <SelectItem value="tracks">트랙만</SelectItem>
                  <SelectItem value="mixed">앨범 + 트랙</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {formData.type === 'albums' && '이 컬렉션에는 앨범만 추가할 수 있습니다'}
                {formData.type === 'tracks' && '이 컬렉션에는 트랙만 추가할 수 있습니다'}
                {formData.type === 'mixed' && '이 컬렉션에는 앨범과 트랙을 모두 추가할 수 있습니다'}
              </p>
            </div>

            {/* 공개 설정 */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>공개 설정</Label>
                <p className="text-sm text-muted-foreground">다른 사람들이 이 컬렉션을 볼 수 있습니다</p>
              </div>
              <div className="flex items-center gap-2">
                {formData.isPublic ? <Globe className="w-4 h-4 text-green-500" /> : <Lock className="w-4 h-4 text-muted-foreground" />}
                <Switch
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => setFormData({...formData, isPublic: checked})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 커버 이미지 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              커버 이미지 *
            </h3>

            {/* 업로드 에러 메시지 */}
            {uploadError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{uploadError}</p>
              </div>
            )}

            {/* 현재 선택된 이미지 */}
            {formData.coverImage && (
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <ImageWithFallback
                    src={formData.coverImage}
                    alt="커버 이미지"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                    onClick={() => setFormData({...formData, coverImage: ''})}
                    disabled={isUploadingImage}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}

            {/* 이미지 옵션 */}
            <div className="grid grid-cols-3 gap-3">
              {coverOptions.map((option) => (
                <div
                  key={option.id}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
                    formData.coverImage === option.url ? 'border-primary' : 'border-border'
                  }`}
                  onClick={() => {
                    setFormData({...formData, coverImage: option.url});
                    setUploadError(null); // 프리셋 선택 시 에러 초기화
                  }}
                >
                  <ImageWithFallback
                    src={option.url}
                    alt={option.name}
                    className="w-full h-20 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs text-center">{option.name}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />

            <Button
              variant="outline"
              className="w-full"
              onClick={handleOpenFileDialog}
              disabled={isUploadingImage}
            >
              {isUploadingImage ? (
                <>
                  <div className="animate-spin w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                  업로드 중...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  직접 업로드
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              JPEG, PNG, GIF 형식 지원 (최대 10MB)
            </p>
          </CardContent>
        </Card>

        {/* 태그 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Hash className="w-4 h-4" />
              태그 (최대 5개)
            </h3>
            
            {/* 태그 입력 */}
            <div className="relative">
              <div className="flex gap-2">
                <Input
                  ref={tagInputRef}
                  placeholder="장르를 입력하세요 (예: K-pop, Rock, Jazz)"
                  value={tagInput}
                  onChange={(e) => handleTagInputChange(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  onFocus={() => tagInput.trim().length > 0 && setShowGenreSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowGenreSuggestions(false), 200)}
                  maxLength={50}
                />
                <Button
                  onClick={() => handleAddTag()}
                  disabled={!tagInput.trim() || tags.length >= 5}
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* 자동완성 드롭다운 */}
              {showGenreSuggestions && filteredGenres.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredGenres.map((genre, index) => (
                    <button
                      key={genre}
                      type="button"
                      className={`w-full px-4 py-2 text-left hover:bg-accent transition-colors flex items-center gap-2 ${
                        index === selectedSuggestionIndex ? 'bg-accent' : ''
                      }`}
                      onClick={() => handleSelectGenre(genre)}
                      onMouseEnter={() => setSelectedSuggestionIndex(index)}
                    >
                      <Hash className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm">{genre}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 태그 목록 */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    #{tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-4 h-4 p-0 hover:bg-transparent"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 음악 추가 */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-medium">음악 추가</h3>

            {/* 검색 타입 토글 (mixed 타입일 때만 표시) */}
            {formData.type === 'mixed' && (
              <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                <Label className="text-xs text-muted-foreground">검색 타입:</Label>
                <div className="flex gap-1">
                  <Button
                    variant={searchType === 'album' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSearchType('album')}
                    className="h-7 px-3 text-xs"
                  >
                    <Album className="w-3 h-3 mr-1" />
                    앨범
                  </Button>
                  <Button
                    variant={searchType === 'track' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSearchType('track')}
                    className="h-7 px-3 text-xs"
                  >
                    <Disc className="w-3 h-3 mr-1" />
                    트랙
                  </Button>
                </div>
              </div>
            )}

            {/* 검색 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="음악을 검색하세요 (영어, 띄어쓰기 없이)"
                value={musicSearchQuery}
                onChange={(e) => setMusicSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* 선택된 음악 */}
            {selectedMusic.length > 0 && (
              <div className="space-y-2">
                <Label>선택된 음악 ({selectedMusic.length})</Label>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {selectedMusic.map((music) => (
                    <div key={music.id} className="p-3 bg-muted/50 rounded-lg space-y-2">
                      <div className="flex items-center gap-3">
                        <ImageWithFallback
                          src={music.imageUrl}
                          alt={music.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{music.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{music.artist}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {music.type === 'album' ? '앨범' : '트랙'}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditDescription(music.id)}
                            className="w-7 h-7 p-0"
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMusic(music.id)}
                            className="w-7 h-7 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* 설명 표시/편집 */}
                      {editingDescription === music.id ? (
                        <div className="space-y-2">
                          <Textarea
                            placeholder="이 곡에 대한 설명을 추가해보세요..."
                            value={tempDescription}
                            onChange={(e) => setTempDescription(e.target.value)}
                            className="text-xs resize-none"
                            rows={2}
                            maxLength={200}
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {tempDescription.length}/200
                            </span>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCancelEdit}
                                className="h-6 px-2 text-xs"
                              >
                                취소
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleSaveDescription(music.id)}
                                className="h-6 px-2 text-xs"
                              >
                                <Check className="w-3 h-3 mr-1" />
                                저장
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            {musicDescriptions[music.id] ? (
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {musicDescriptions[music.id]}
                              </p>
                            ) : (
                              <p className="text-xs text-muted-foreground italic">
                                설명이 없습니다. 편집 버튼을 클릭해서 설명을 추가해보세요.
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* 검색 결과 */}
            <div className="space-y-2">
              <Label>검색 결과</Label>

              {/* 로딩 상태 */}
              {searchLoading && (
                <div className="text-sm text-muted-foreground text-center py-8">
                  <div className="animate-pulse">검색 중...</div>
                </div>
              )}

              {/* 에러 상태 */}
              {searchError && !searchLoading && (
                <div className="text-sm text-red-500 text-center py-4 bg-red-50 rounded-lg">
                  {searchError.message}
                </div>
              )}

              {/* 검색 결과 */}
              {!searchLoading && !searchError && searchResults.length > 0 && (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {searchResults.map((music) => (
                    <div key={music.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
                      <ImageWithFallback
                        src={music.imageUrl}
                        alt={music.title}
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{music.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{music.artist || 'Unknown Artist'}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {music.type === 'album' ? '앨범' : music.type === 'track' ? '트랙' : '아티스트'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddMusic(music)}
                        disabled={selectedMusic.find(item => item.id === music.id) !== undefined}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* 빈 상태 */}
              {!searchLoading && !searchError && musicSearchQuery && searchResults.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  검색 결과가 없습니다
                </p>
              )}

              {!musicSearchQuery && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  음악을 검색해보세요 (영어, 띄어쓰기 없이)
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 저장 버튼 */}
        <Card>
          <CardContent className="p-4 space-y-3">
            {/* 에러 메시지 */}
            {saveError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{saveError}</p>
              </div>
            )}

            <Button
              onClick={handleSave}
              disabled={!formData.title.trim() || isSaving}
              className="w-full"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  컬렉션 저장
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              {formData.isPublic ? '공개 컬렉션으로 저장됩니다' : '비공개 컬렉션으로 저장됩니다'}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}