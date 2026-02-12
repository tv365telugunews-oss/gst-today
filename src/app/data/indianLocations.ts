// Comprehensive Indian States, Districts, and Mandals/Towns Data

export interface Mandal {
  name: string;
  type: 'mandal' | 'town' | 'city';
}

export interface District {
  name: string;
  mandals: Mandal[];
}

export interface State {
  name: string;
  districts: District[];
}

export const indianStates: State[] = [
  {
    name: 'Andhra Pradesh',
    districts: [
      {
        name: 'Anantapur',
        mandals: [
          { name: 'Anantapur', type: 'city' },
          { name: 'Hindupur', type: 'town' },
          { name: 'Guntakal', type: 'town' },
          { name: 'Dharmavaram', type: 'town' },
          { name: 'Kadiri', type: 'mandal' },
          { name: 'Rayadurgam', type: 'mandal' },
          { name: 'Penukonda', type: 'mandal' },
        ],
      },
      {
        name: 'Chittoor',
        mandals: [
          { name: 'Chittoor', type: 'city' },
          { name: 'Tirupati', type: 'city' },
          { name: 'Madanapalle', type: 'town' },
          { name: 'Punganur', type: 'mandal' },
          { name: 'Palamaner', type: 'mandal' },
          { name: 'Puttur', type: 'mandal' },
        ],
      },
      {
        name: 'East Godavari',
        mandals: [
          { name: 'Kakinada', type: 'city' },
          { name: 'Rajahmundry', type: 'city' },
          { name: 'Amalapuram', type: 'town' },
          { name: 'Peddapuram', type: 'town' },
          { name: 'Tuni', type: 'mandal' },
          { name: 'Ramachandrapuram', type: 'mandal' },
        ],
      },
      {
        name: 'Guntur',
        mandals: [
          { name: 'Guntur', type: 'city' },
          { name: 'Tenali', type: 'town' },
          { name: 'Narasaraopet', type: 'town' },
          { name: 'Mangalagiri', type: 'mandal' },
          { name: 'Ponnur', type: 'mandal' },
          { name: 'Sattenapalle', type: 'mandal' },
          { name: 'Bapatla', type: 'mandal' },
        ],
      },
      {
        name: 'Krishna',
        mandals: [
          { name: 'Vijayawada', type: 'city' },
          { name: 'Machilipatnam', type: 'town' },
          { name: 'Gudivada', type: 'town' },
          { name: 'Gannavaram', type: 'mandal' },
          { name: 'Jaggayyapeta', type: 'mandal' },
          { name: 'Nuzvid', type: 'mandal' },
        ],
      },
      {
        name: 'Kurnool',
        mandals: [
          { name: 'Kurnool', type: 'city' },
          { name: 'Nandyal', type: 'town' },
          { name: 'Adoni', type: 'town' },
          { name: 'Yemmiganur', type: 'mandal' },
          { name: 'Dhone', type: 'mandal' },
          { name: 'Pattikonda', type: 'mandal' },
        ],
      },
      {
        name: 'Prakasam',
        mandals: [
          { name: 'Ongole', type: 'city' },
          { name: 'Chirala', type: 'town' },
          { name: 'Kandukur', type: 'town' },
          { name: 'Markapur', type: 'mandal' },
          { name: 'Giddalur', type: 'mandal' },
        ],
      },
      {
        name: 'Nellore',
        mandals: [
          { name: 'Nellore', type: 'city' },
          { name: 'Gudur', type: 'town' },
          { name: 'Kavali', type: 'town' },
          { name: 'Atmakur', type: 'mandal' },
          { name: 'Sullurpeta', type: 'mandal' },
        ],
      },
      {
        name: 'Srikakulam',
        mandals: [
          { name: 'Srikakulam', type: 'city' },
          { name: 'Palasa', type: 'town' },
          { name: 'Amadalavalasa', type: 'town' },
          { name: 'Ichapuram', type: 'mandal' },
          { name: 'Tekkali', type: 'mandal' },
        ],
      },
      {
        name: 'Visakhapatnam',
        mandals: [
          { name: 'Visakhapatnam', type: 'city' },
          { name: 'Gajuwaka', type: 'mandal' },
          { name: 'Anakapalli', type: 'town' },
          { name: 'Bheemunipatnam', type: 'mandal' },
          { name: 'Narsipatnam', type: 'mandal' },
          { name: 'Yelamanchili', type: 'mandal' },
        ],
      },
      {
        name: 'Vizianagaram',
        mandals: [
          { name: 'Vizianagaram', type: 'city' },
          { name: 'Bobbili', type: 'town' },
          { name: 'Parvathipuram', type: 'town' },
          { name: 'Salur', type: 'mandal' },
          { name: 'Gajapathinagaram', type: 'mandal' },
        ],
      },
      {
        name: 'West Godavari',
        mandals: [
          { name: 'Eluru', type: 'city' },
          { name: 'Bhimavaram', type: 'town' },
          { name: 'Tadepalligudem', type: 'town' },
          { name: 'Tanuku', type: 'mandal' },
          { name: 'Narasapuram', type: 'mandal' },
        ],
      },
      {
        name: 'YSR Kadapa',
        mandals: [
          { name: 'Kadapa', type: 'city' },
          { name: 'Proddatur', type: 'town' },
          { name: 'Jammalamadugu', type: 'town' },
          { name: 'Rajampet', type: 'mandal' },
          { name: 'Pulivendula', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Arunachal Pradesh',
    districts: [
      {
        name: 'Itanagar Capital Complex',
        mandals: [
          { name: 'Itanagar', type: 'city' },
          { name: 'Naharlagun', type: 'town' },
          { name: 'Nirjuli', type: 'town' },
        ],
      },
      {
        name: 'Tawang',
        mandals: [
          { name: 'Tawang', type: 'town' },
          { name: 'Lumla', type: 'mandal' },
          { name: 'Jang', type: 'mandal' },
        ],
      },
      {
        name: 'West Kameng',
        mandals: [
          { name: 'Bomdila', type: 'town' },
          { name: 'Dirang', type: 'town' },
          { name: 'Kalaktang', type: 'mandal' },
        ],
      },
      {
        name: 'East Kameng',
        mandals: [
          { name: 'Seppa', type: 'town' },
          { name: 'Bameng', type: 'mandal' },
          { name: 'Chayangtajo', type: 'mandal' },
        ],
      },
      {
        name: 'Papum Pare',
        mandals: [
          { name: 'Yupia', type: 'town' },
          { name: 'Doimukh', type: 'town' },
          { name: 'Sagalee', type: 'mandal' },
        ],
      },
      {
        name: 'Lower Subansiri',
        mandals: [
          { name: 'Ziro', type: 'town' },
          { name: 'Hapoli', type: 'town' },
          { name: 'Yachuli', type: 'mandal' },
        ],
      },
      {
        name: 'Upper Subansiri',
        mandals: [
          { name: 'Daporijo', type: 'town' },
          { name: 'Dumporijo', type: 'mandal' },
          { name: 'Taliha', type: 'mandal' },
        ],
      },
      {
        name: 'West Siang',
        mandals: [
          { name: 'Along', type: 'town' },
          { name: 'Basar', type: 'town' },
          { name: 'Likabali', type: 'mandal' },
        ],
      },
      {
        name: 'East Siang',
        mandals: [
          { name: 'Pasighat', type: 'town' },
          { name: 'Mebo', type: 'mandal' },
          { name: 'Ruksin', type: 'mandal' },
        ],
      },
      {
        name: 'Upper Siang',
        mandals: [
          { name: 'Yingkiong', type: 'town' },
          { name: 'Geku', type: 'mandal' },
          { name: 'Payum', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Assam',
    districts: [
      {
        name: 'Kamrup Metropolitan',
        mandals: [
          { name: 'Guwahati', type: 'city' },
          { name: 'Dispur', type: 'town' },
          { name: 'Jalukbari', type: 'mandal' },
          { name: 'Azara', type: 'mandal' },
        ],
      },
      {
        name: 'Kamrup',
        mandals: [
          { name: 'Amingaon', type: 'town' },
          { name: 'Rangia', type: 'town' },
          { name: 'Hajo', type: 'mandal' },
          { name: 'Chaygaon', type: 'mandal' },
        ],
      },
      {
        name: 'Nagaon',
        mandals: [
          { name: 'Nagaon', type: 'city' },
          { name: 'Hojai', type: 'town' },
          { name: 'Lanka', type: 'town' },
          { name: 'Kaliabor', type: 'mandal' },
        ],
      },
      {
        name: 'Sonitpur',
        mandals: [
          { name: 'Tezpur', type: 'city' },
          { name: 'Dhekiajuli', type: 'town' },
          { name: 'Biswanath Chariali', type: 'town' },
          { name: 'Rangapara', type: 'mandal' },
        ],
      },
      {
        name: 'Dibrugarh',
        mandals: [
          { name: 'Dibrugarh', type: 'city' },
          { name: 'Naharkatia', type: 'town' },
          { name: 'Duliajan', type: 'town' },
          { name: 'Moran', type: 'mandal' },
        ],
      },
      {
        name: 'Jorhat',
        mandals: [
          { name: 'Jorhat', type: 'city' },
          { name: 'Titabar', type: 'town' },
          { name: 'Mariani', type: 'town' },
          { name: 'Teok', type: 'mandal' },
        ],
      },
      {
        name: 'Sivasagar',
        mandals: [
          { name: 'Sivasagar', type: 'town' },
          { name: 'Nazira', type: 'town' },
          { name: 'Gaurisagar', type: 'mandal' },
          { name: 'Sonari', type: 'mandal' },
        ],
      },
      {
        name: 'Golaghat',
        mandals: [
          { name: 'Golaghat', type: 'town' },
          { name: 'Bokakhat', type: 'town' },
          { name: 'Sarupathar', type: 'mandal' },
          { name: 'Dergaon', type: 'mandal' },
        ],
      },
      {
        name: 'Cachar',
        mandals: [
          { name: 'Silchar', type: 'city' },
          { name: 'Karimganj', type: 'town' },
          { name: 'Hailakandi', type: 'town' },
          { name: 'Lakhipur', type: 'mandal' },
        ],
      },
      {
        name: 'Barpeta',
        mandals: [
          { name: 'Barpeta', type: 'town' },
          { name: 'Barpeta Road', type: 'town' },
          { name: 'Howli', type: 'mandal' },
          { name: 'Sarthebari', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Bihar',
    districts: [
      {
        name: 'Patna',
        mandals: [
          { name: 'Patna', type: 'city' },
          { name: 'Danapur', type: 'town' },
          { name: 'Phulwari Sharif', type: 'town' },
          { name: 'Masaurhi', type: 'mandal' },
          { name: 'Barh', type: 'mandal' },
        ],
      },
      {
        name: 'Gaya',
        mandals: [
          { name: 'Gaya', type: 'city' },
          { name: 'Bodh Gaya', type: 'town' },
          { name: 'Tekari', type: 'mandal' },
          { name: 'Sherghati', type: 'mandal' },
        ],
      },
      {
        name: 'Bhagalpur',
        mandals: [
          { name: 'Bhagalpur', type: 'city' },
          { name: 'Kahalgaon', type: 'town' },
          { name: 'Naugachhia', type: 'mandal' },
          { name: 'Sultanganj', type: 'mandal' },
        ],
      },
      {
        name: 'Muzaffarpur',
        mandals: [
          { name: 'Muzaffarpur', type: 'city' },
          { name: 'Motihari', type: 'town' },
          { name: 'Sitamarhi', type: 'town' },
          { name: 'Saraiya', type: 'mandal' },
        ],
      },
      {
        name: 'Darbhanga',
        mandals: [
          { name: 'Darbhanga', type: 'city' },
          { name: 'Laheriasarai', type: 'town' },
          { name: 'Benipur', type: 'mandal' },
          { name: 'Jale', type: 'mandal' },
        ],
      },
      {
        name: 'Purnia',
        mandals: [
          { name: 'Purnia', type: 'city' },
          { name: 'Baisi', type: 'town' },
          { name: 'Dhamdaha', type: 'mandal' },
          { name: 'Kasba', type: 'mandal' },
        ],
      },
      {
        name: 'Saharsa',
        mandals: [
          { name: 'Saharsa', type: 'town' },
          { name: 'Simri Bakhtiarpur', type: 'mandal' },
          { name: 'Mahishi', type: 'mandal' },
        ],
      },
      {
        name: 'Araria',
        mandals: [
          { name: 'Araria', type: 'town' },
          { name: 'Forbesganj', type: 'town' },
          { name: 'Jokihat', type: 'mandal' },
        ],
      },
      {
        name: 'Begusarai',
        mandals: [
          { name: 'Begusarai', type: 'town' },
          { name: 'Bakhri', type: 'mandal' },
          { name: 'Teghra', type: 'mandal' },
        ],
      },
      {
        name: 'Nalanda',
        mandals: [
          { name: 'Bihar Sharif', type: 'city' },
          { name: 'Rajgir', type: 'town' },
          { name: 'Hilsa', type: 'mandal' },
          { name: 'Asthawan', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Chhattisgarh',
    districts: [
      {
        name: 'Raipur',
        mandals: [
          { name: 'Raipur', type: 'city' },
          { name: 'Arang', type: 'town' },
          { name: 'Tilda', type: 'mandal' },
          { name: 'Abhanpur', type: 'mandal' },
        ],
      },
      {
        name: 'Durg',
        mandals: [
          { name: 'Durg', type: 'city' },
          { name: 'Bhilai', type: 'city' },
          { name: 'Patan', type: 'mandal' },
          { name: 'Balod', type: 'mandal' },
        ],
      },
      {
        name: 'Bilaspur',
        mandals: [
          { name: 'Bilaspur', type: 'city' },
          { name: 'Kota', type: 'town' },
          { name: 'Ratanpur', type: 'mandal' },
          { name: 'Takhatpur', type: 'mandal' },
        ],
      },
      {
        name: 'Korba',
        mandals: [
          { name: 'Korba', type: 'city' },
          { name: 'Katghora', type: 'town' },
          { name: 'Pali', type: 'mandal' },
        ],
      },
      {
        name: 'Raigarh',
        mandals: [
          { name: 'Raigarh', type: 'city' },
          { name: 'Dharamjaigarh', type: 'town' },
          { name: 'Sarangarh', type: 'mandal' },
        ],
      },
      {
        name: 'Rajnandgaon',
        mandals: [
          { name: 'Rajnandgaon', type: 'city' },
          { name: 'Dongargaon', type: 'town' },
          { name: 'Chhuria', type: 'mandal' },
        ],
      },
      {
        name: 'Bastar',
        mandals: [
          { name: 'Jagdalpur', type: 'city' },
          { name: 'Kondagaon', type: 'town' },
          { name: 'Bakawand', type: 'mandal' },
        ],
      },
      {
        name: 'Janjgir-Champa',
        mandals: [
          { name: 'Janjgir', type: 'town' },
          { name: 'Champa', type: 'town' },
          { name: 'Akaltara', type: 'mandal' },
        ],
      },
      {
        name: 'Surguja',
        mandals: [
          { name: 'Ambikapur', type: 'city' },
          { name: 'Surajpur', type: 'town' },
          { name: 'Lakhanpur', type: 'mandal' },
        ],
      },
      {
        name: 'Dhamtari',
        mandals: [
          { name: 'Dhamtari', type: 'town' },
          { name: 'Kurud', type: 'mandal' },
          { name: 'Nagri', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Goa',
    districts: [
      {
        name: 'North Goa',
        mandals: [
          { name: 'Panaji', type: 'city' },
          { name: 'Mapusa', type: 'town' },
          { name: 'Ponda', type: 'town' },
          { name: 'Bicholim', type: 'mandal' },
          { name: 'Pernem', type: 'mandal' },
          { name: 'Bardez', type: 'mandal' },
        ],
      },
      {
        name: 'South Goa',
        mandals: [
          { name: 'Margao', type: 'city' },
          { name: 'Vasco da Gama', type: 'city' },
          { name: 'Quepem', type: 'town' },
          { name: 'Canacona', type: 'mandal' },
          { name: 'Sanguem', type: 'mandal' },
          { name: 'Salcete', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Gujarat',
    districts: [
      {
        name: 'Ahmedabad',
        mandals: [
          { name: 'Ahmedabad', type: 'city' },
          { name: 'Gandhinagar', type: 'city' },
          { name: 'Sanand', type: 'town' },
          { name: 'Dholka', type: 'mandal' },
          { name: 'Daskroi', type: 'mandal' },
        ],
      },
      {
        name: 'Surat',
        mandals: [
          { name: 'Surat', type: 'city' },
          { name: 'Bardoli', type: 'town' },
          { name: 'Kamrej', type: 'mandal' },
          { name: 'Chorasi', type: 'mandal' },
        ],
      },
      {
        name: 'Vadodara',
        mandals: [
          { name: 'Vadodara', type: 'city' },
          { name: 'Padra', type: 'town' },
          { name: 'Dabhoi', type: 'town' },
          { name: 'Karjan', type: 'mandal' },
        ],
      },
      {
        name: 'Rajkot',
        mandals: [
          { name: 'Rajkot', type: 'city' },
          { name: 'Gondal', type: 'town' },
          { name: 'Jetpur', type: 'town' },
          { name: 'Upleta', type: 'mandal' },
        ],
      },
      {
        name: 'Bhavnagar',
        mandals: [
          { name: 'Bhavnagar', type: 'city' },
          { name: 'Mahuva', type: 'town' },
          { name: 'Talaja', type: 'mandal' },
          { name: 'Sihor', type: 'mandal' },
        ],
      },
      {
        name: 'Jamnagar',
        mandals: [
          { name: 'Jamnagar', type: 'city' },
          { name: 'Dwarka', type: 'town' },
          { name: 'Khambhalia', type: 'mandal' },
          { name: 'Okha', type: 'mandal' },
        ],
      },
      {
        name: 'Junagadh',
        mandals: [
          { name: 'Junagadh', type: 'city' },
          { name: 'Veraval', type: 'town' },
          { name: 'Mangrol', type: 'town' },
          { name: 'Keshod', type: 'mandal' },
        ],
      },
      {
        name: 'Mehsana',
        mandals: [
          { name: 'Mehsana', type: 'city' },
          { name: 'Patan', type: 'town' },
          { name: 'Visnagar', type: 'town' },
          { name: 'Kadi', type: 'mandal' },
        ],
      },
      {
        name: 'Anand',
        mandals: [
          { name: 'Anand', type: 'city' },
          { name: 'Nadiad', type: 'town' },
          { name: 'Petlad', type: 'mandal' },
          { name: 'Khambhat', type: 'mandal' },
        ],
      },
      {
        name: 'Banaskantha',
        mandals: [
          { name: 'Palanpur', type: 'city' },
          { name: 'Deesa', type: 'town' },
          { name: 'Dhanera', type: 'mandal' },
          { name: 'Tharad', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Haryana',
    districts: [
      {
        name: 'Gurugram',
        mandals: [
          { name: 'Gurugram', type: 'city' },
          { name: 'Sohna', type: 'town' },
          { name: 'Pataudi', type: 'mandal' },
          { name: 'Manesar', type: 'mandal' },
        ],
      },
      {
        name: 'Faridabad',
        mandals: [
          { name: 'Faridabad', type: 'city' },
          { name: 'Ballabgarh', type: 'town' },
          { name: 'Palwal', type: 'town' },
          { name: 'Badkhal', type: 'mandal' },
        ],
      },
      {
        name: 'Ambala',
        mandals: [
          { name: 'Ambala', type: 'city' },
          { name: 'Ambala Cantt', type: 'town' },
          { name: 'Barara', type: 'mandal' },
          { name: 'Naraingarh', type: 'mandal' },
        ],
      },
      {
        name: 'Karnal',
        mandals: [
          { name: 'Karnal', type: 'city' },
          { name: 'Assandh', type: 'town' },
          { name: 'Gharaunda', type: 'mandal' },
          { name: 'Nilokheri', type: 'mandal' },
        ],
      },
      {
        name: 'Panipat',
        mandals: [
          { name: 'Panipat', type: 'city' },
          { name: 'Samalkha', type: 'mandal' },
          { name: 'Madlauda', type: 'mandal' },
        ],
      },
      {
        name: 'Hisar',
        mandals: [
          { name: 'Hisar', type: 'city' },
          { name: 'Hansi', type: 'town' },
          { name: 'Barwala', type: 'mandal' },
          { name: 'Adampur', type: 'mandal' },
        ],
      },
      {
        name: 'Rohtak',
        mandals: [
          { name: 'Rohtak', type: 'city' },
          { name: 'Meham', type: 'mandal' },
          { name: 'Kalanaur', type: 'mandal' },
        ],
      },
      {
        name: 'Sonipat',
        mandals: [
          { name: 'Sonipat', type: 'city' },
          { name: 'Gohana', type: 'town' },
          { name: 'Kharkhoda', type: 'mandal' },
          { name: 'Gannaur', type: 'mandal' },
        ],
      },
      {
        name: 'Bhiwani',
        mandals: [
          { name: 'Bhiwani', type: 'city' },
          { name: 'Charkhi Dadri', type: 'town' },
          { name: 'Loharu', type: 'mandal' },
          { name: 'Tosham', type: 'mandal' },
        ],
      },
      {
        name: 'Jhajjar',
        mandals: [
          { name: 'Jhajjar', type: 'town' },
          { name: 'Bahadurgarh', type: 'city' },
          { name: 'Beri', type: 'mandal' },
          { name: 'Matanhail', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Himachal Pradesh',
    districts: [
      {
        name: 'Shimla',
        mandals: [
          { name: 'Shimla', type: 'city' },
          { name: 'Solan', type: 'town' },
          { name: 'Theog', type: 'mandal' },
          { name: 'Rampur', type: 'mandal' },
        ],
      },
      {
        name: 'Kangra',
        mandals: [
          { name: 'Dharamshala', type: 'city' },
          { name: 'Palampur', type: 'town' },
          { name: 'Kangra', type: 'town' },
          { name: 'Nurpur', type: 'mandal' },
        ],
      },
      {
        name: 'Mandi',
        mandals: [
          { name: 'Mandi', type: 'city' },
          { name: 'Sundernagar', type: 'town' },
          { name: 'Jogindernagar', type: 'mandal' },
          { name: 'Karsog', type: 'mandal' },
        ],
      },
      {
        name: 'Kullu',
        mandals: [
          { name: 'Kullu', type: 'city' },
          { name: 'Manali', type: 'town' },
          { name: 'Bhuntar', type: 'mandal' },
          { name: 'Banjar', type: 'mandal' },
        ],
      },
      {
        name: 'Una',
        mandals: [
          { name: 'Una', type: 'town' },
          { name: 'Amb', type: 'mandal' },
          { name: 'Bangana', type: 'mandal' },
        ],
      },
      {
        name: 'Hamirpur',
        mandals: [
          { name: 'Hamirpur', type: 'town' },
          { name: 'Nadaun', type: 'mandal' },
          { name: 'Barsar', type: 'mandal' },
        ],
      },
      {
        name: 'Bilaspur',
        mandals: [
          { name: 'Bilaspur', type: 'town' },
          { name: 'Ghumarwin', type: 'mandal' },
          { name: 'Jhanduta', type: 'mandal' },
        ],
      },
      {
        name: 'Sirmour',
        mandals: [
          { name: 'Nahan', type: 'town' },
          { name: 'Paonta Sahib', type: 'town' },
          { name: 'Rajgarh', type: 'mandal' },
        ],
      },
      {
        name: 'Chamba',
        mandals: [
          { name: 'Chamba', type: 'town' },
          { name: 'Dalhousie', type: 'town' },
          { name: 'Bharmour', type: 'mandal' },
        ],
      },
      {
        name: 'Kinnaur',
        mandals: [
          { name: 'Reckong Peo', type: 'town' },
          { name: 'Kalpa', type: 'mandal' },
          { name: 'Nichar', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Jharkhand',
    districts: [
      {
        name: 'Ranchi',
        mandals: [
          { name: 'Ranchi', type: 'city' },
          { name: 'Hatia', type: 'town' },
          { name: 'Bundu', type: 'mandal' },
          { name: 'Kanke', type: 'mandal' },
        ],
      },
      {
        name: 'Dhanbad',
        mandals: [
          { name: 'Dhanbad', type: 'city' },
          { name: 'Jharia', type: 'town' },
          { name: 'Sindri', type: 'town' },
          { name: 'Baliapur', type: 'mandal' },
        ],
      },
      {
        name: 'Jamshedpur',
        mandals: [
          { name: 'Jamshedpur', type: 'city' },
          { name: 'Jugsalai', type: 'town' },
          { name: 'Mango', type: 'mandal' },
          { name: 'Seraikella', type: 'mandal' },
        ],
      },
      {
        name: 'Bokaro',
        mandals: [
          { name: 'Bokaro Steel City', type: 'city' },
          { name: 'Chas', type: 'town' },
          { name: 'Phusro', type: 'mandal' },
          { name: 'Bermo', type: 'mandal' },
        ],
      },
      {
        name: 'Deoghar',
        mandals: [
          { name: 'Deoghar', type: 'city' },
          { name: 'Jasidih', type: 'town' },
          { name: 'Madhupur', type: 'mandal' },
          { name: 'Sarwan', type: 'mandal' },
        ],
      },
      {
        name: 'Hazaribagh',
        mandals: [
          { name: 'Hazaribagh', type: 'city' },
          { name: 'Ramgarh', type: 'town' },
          { name: 'Chatra', type: 'town' },
          { name: 'Barhi', type: 'mandal' },
        ],
      },
      {
        name: 'Giridih',
        mandals: [
          { name: 'Giridih', type: 'town' },
          { name: 'Dumri', type: 'mandal' },
          { name: 'Bengabad', type: 'mandal' },
        ],
      },
      {
        name: 'Palamu',
        mandals: [
          { name: 'Daltonganj', type: 'city' },
          { name: 'Hussainabad', type: 'mandal' },
          { name: 'Garhwa', type: 'mandal' },
        ],
      },
      {
        name: 'Dumka',
        mandals: [
          { name: 'Dumka', type: 'town' },
          { name: 'Jama', type: 'mandal' },
          { name: 'Ramgarh', type: 'mandal' },
        ],
      },
      {
        name: 'Gumla',
        mandals: [
          { name: 'Gumla', type: 'town' },
          { name: 'Sisai', type: 'mandal' },
          { name: 'Basia', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Karnataka',
    districts: [
      {
        name: 'Bengaluru Urban',
        mandals: [
          { name: 'Bengaluru', type: 'city' },
          { name: 'Yelahanka', type: 'town' },
          { name: 'Byatarayanapura', type: 'mandal' },
          { name: 'Anekal', type: 'mandal' },
        ],
      },
      {
        name: 'Mysuru',
        mandals: [
          { name: 'Mysuru', type: 'city' },
          { name: 'Nanjangud', type: 'town' },
          { name: 'T. Narasipura', type: 'mandal' },
          { name: 'Hunsur', type: 'mandal' },
        ],
      },
      {
        name: 'Mangaluru',
        mandals: [
          { name: 'Mangaluru', type: 'city' },
          { name: 'Bantwal', type: 'town' },
          { name: 'Puttur', type: 'town' },
          { name: 'Sullia', type: 'mandal' },
        ],
      },
      {
        name: 'Hubballi-Dharwad',
        mandals: [
          { name: 'Hubballi', type: 'city' },
          { name: 'Dharwad', type: 'city' },
          { name: 'Kalghatgi', type: 'mandal' },
          { name: 'Kundgol', type: 'mandal' },
        ],
      },
      {
        name: 'Belagavi',
        mandals: [
          { name: 'Belagavi', type: 'city' },
          { name: 'Gokak', type: 'town' },
          { name: 'Bailhongal', type: 'mandal' },
          { name: 'Raybag', type: 'mandal' },
        ],
      },
      {
        name: 'Kalaburagi',
        mandals: [
          { name: 'Kalaburagi', type: 'city' },
          { name: 'Afzalpur', type: 'town' },
          { name: 'Aland', type: 'mandal' },
          { name: 'Chincholi', type: 'mandal' },
        ],
      },
      {
        name: 'Ballari',
        mandals: [
          { name: 'Ballari', type: 'city' },
          { name: 'Hospet', type: 'town' },
          { name: 'Sandur', type: 'mandal' },
          { name: 'Kudligi', type: 'mandal' },
        ],
      },
      {
        name: 'Shivamogga',
        mandals: [
          { name: 'Shivamogga', type: 'city' },
          { name: 'Bhadravati', type: 'town' },
          { name: 'Sagar', type: 'town' },
          { name: 'Thirthahalli', type: 'mandal' },
        ],
      },
      {
        name: 'Tumakuru',
        mandals: [
          { name: 'Tumakuru', type: 'city' },
          { name: 'Tiptur', type: 'town' },
          { name: 'Turuvekere', type: 'mandal' },
          { name: 'Madhugiri', type: 'mandal' },
        ],
      },
      {
        name: 'Vijayapura',
        mandals: [
          { name: 'Vijayapura', type: 'city' },
          { name: 'Indi', type: 'town' },
          { name: 'Sindagi', type: 'mandal' },
          { name: 'Basavana Bagewadi', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Kerala',
    districts: [
      {
        name: 'Thiruvananthapuram',
        mandals: [
          { name: 'Thiruvananthapuram', type: 'city' },
          { name: 'Neyyattinkara', type: 'town' },
          { name: 'Attingal', type: 'town' },
          { name: 'Varkala', type: 'mandal' },
        ],
      },
      {
        name: 'Kollam',
        mandals: [
          { name: 'Kollam', type: 'city' },
          { name: 'Karunagappally', type: 'town' },
          { name: 'Punalur', type: 'town' },
          { name: 'Kottarakkara', type: 'mandal' },
        ],
      },
      {
        name: 'Pathanamthitta',
        mandals: [
          { name: 'Pathanamthitta', type: 'city' },
          { name: 'Adoor', type: 'town' },
          { name: 'Thiruvalla', type: 'town' },
          { name: 'Ranni', type: 'mandal' },
        ],
      },
      {
        name: 'Alappuzha',
        mandals: [
          { name: 'Alappuzha', type: 'city' },
          { name: 'Cherthala', type: 'town' },
          { name: 'Kayamkulam', type: 'town' },
          { name: 'Mavelikkara', type: 'mandal' },
        ],
      },
      {
        name: 'Kottayam',
        mandals: [
          { name: 'Kottayam', type: 'city' },
          { name: 'Changanassery', type: 'town' },
          { name: 'Pala', type: 'town' },
          { name: 'Vaikom', type: 'mandal' },
        ],
      },
      {
        name: 'Ernakulam',
        mandals: [
          { name: 'Kochi', type: 'city' },
          { name: 'Aluva', type: 'town' },
          { name: 'Perumbavoor', type: 'town' },
          { name: 'Muvattupuzha', type: 'mandal' },
        ],
      },
      {
        name: 'Thrissur',
        mandals: [
          { name: 'Thrissur', type: 'city' },
          { name: 'Irinjalakuda', type: 'town' },
          { name: 'Chalakudy', type: 'town' },
          { name: 'Kodungallur', type: 'mandal' },
        ],
      },
      {
        name: 'Palakkad',
        mandals: [
          { name: 'Palakkad', type: 'city' },
          { name: 'Ottapalam', type: 'town' },
          { name: 'Chittur', type: 'town' },
          { name: 'Mannarkkad', type: 'mandal' },
        ],
      },
      {
        name: 'Malappuram',
        mandals: [
          { name: 'Malappuram', type: 'city' },
          { name: 'Manjeri', type: 'town' },
          { name: 'Tirur', type: 'town' },
          { name: 'Ponnani', type: 'mandal' },
        ],
      },
      {
        name: 'Kozhikode',
        mandals: [
          { name: 'Kozhikode', type: 'city' },
          { name: 'Vadakara', type: 'town' },
          { name: 'Koyilandy', type: 'town' },
          { name: 'Quilandy', type: 'mandal' },
        ],
      },
      {
        name: 'Wayanad',
        mandals: [
          { name: 'Kalpetta', type: 'city' },
          { name: 'Mananthavady', type: 'town' },
          { name: 'Sulthan Bathery', type: 'town' },
        ],
      },
      {
        name: 'Kannur',
        mandals: [
          { name: 'Kannur', type: 'city' },
          { name: 'Thalassery', type: 'town' },
          { name: 'Payyanur', type: 'town' },
          { name: 'Mattannur', type: 'mandal' },
        ],
      },
      {
        name: 'Kasaragod',
        mandals: [
          { name: 'Kasaragod', type: 'city' },
          { name: 'Kanhangad', type: 'town' },
          { name: 'Nileshwaram', type: 'mandal' },
        ],
      },
      {
        name: 'Idukki',
        mandals: [
          { name: 'Thodupuzha', type: 'town' },
          { name: 'Munnar', type: 'town' },
          { name: 'Adimaly', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Madhya Pradesh',
    districts: [
      {
        name: 'Indore',
        mandals: [
          { name: 'Indore', type: 'city' },
          { name: 'Mhow', type: 'town' },
          { name: 'Depalpur', type: 'mandal' },
          { name: 'Sanwer', type: 'mandal' },
        ],
      },
      {
        name: 'Bhopal',
        mandals: [
          { name: 'Bhopal', type: 'city' },
          { name: 'Berasia', type: 'town' },
          { name: 'Huzur', type: 'mandal' },
        ],
      },
      {
        name: 'Jabalpur',
        mandals: [
          { name: 'Jabalpur', type: 'city' },
          { name: 'Sihora', type: 'town' },
          { name: 'Patan', type: 'mandal' },
          { name: 'Kundam', type: 'mandal' },
        ],
      },
      {
        name: 'Gwalior',
        mandals: [
          { name: 'Gwalior', type: 'city' },
          { name: 'Dabra', type: 'town' },
          { name: 'Bhitarwar', type: 'mandal' },
        ],
      },
      {
        name: 'Ujjain',
        mandals: [
          { name: 'Ujjain', type: 'city' },
          { name: 'Nagda', type: 'town' },
          { name: 'Tarana', type: 'mandal' },
          { name: 'Mahidpur', type: 'mandal' },
        ],
      },
      {
        name: 'Sagar',
        mandals: [
          { name: 'Sagar', type: 'city' },
          { name: 'Rehli', type: 'town' },
          { name: 'Banda', type: 'mandal' },
          { name: 'Khurai', type: 'mandal' },
        ],
      },
      {
        name: 'Ratlam',
        mandals: [
          { name: 'Ratlam', type: 'city' },
          { name: 'Jaora', type: 'town' },
          { name: 'Alot', type: 'mandal' },
          { name: 'Sailana', type: 'mandal' },
        ],
      },
      {
        name: 'Satna',
        mandals: [
          { name: 'Satna', type: 'city' },
          { name: 'Maihar', type: 'town' },
          { name: 'Nagod', type: 'mandal' },
          { name: 'Rampur Baghelan', type: 'mandal' },
        ],
      },
      {
        name: 'Dewas',
        mandals: [
          { name: 'Dewas', type: 'city' },
          { name: 'Bagli', type: 'mandal' },
          { name: 'Khategaon', type: 'mandal' },
          { name: 'Tonk Khurd', type: 'mandal' },
        ],
      },
      {
        name: 'Rewa',
        mandals: [
          { name: 'Rewa', type: 'city' },
          { name: 'Sirmour', type: 'town' },
          { name: 'Teonthar', type: 'mandal' },
          { name: 'Mauganj', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Maharashtra',
    districts: [
      {
        name: 'Mumbai City',
        mandals: [
          { name: 'South Mumbai', type: 'city' },
          { name: 'Colaba', type: 'town' },
          { name: 'Marine Lines', type: 'mandal' },
          { name: 'Girgaon', type: 'mandal' },
        ],
      },
      {
        name: 'Mumbai Suburban',
        mandals: [
          { name: 'Andheri', type: 'city' },
          { name: 'Bandra', type: 'town' },
          { name: 'Borivali', type: 'town' },
          { name: 'Juhu', type: 'mandal' },
          { name: 'Malad', type: 'mandal' },
        ],
      },
      {
        name: 'Thane',
        mandals: [
          { name: 'Thane', type: 'city' },
          { name: 'Kalyan', type: 'city' },
          { name: 'Dombivli', type: 'town' },
          { name: 'Bhiwandi', type: 'town' },
          { name: 'Ulhasnagar', type: 'mandal' },
        ],
      },
      {
        name: 'Pune',
        mandals: [
          { name: 'Pune', type: 'city' },
          { name: 'Pimpri-Chinchwad', type: 'city' },
          { name: 'Khadki', type: 'town' },
          { name: 'Hadapsar', type: 'mandal' },
          { name: 'Hinjewadi', type: 'mandal' },
        ],
      },
      {
        name: 'Nagpur',
        mandals: [
          { name: 'Nagpur', type: 'city' },
          { name: 'Kamptee', type: 'town' },
          { name: 'Ramtek', type: 'town' },
          { name: 'Hingna', type: 'mandal' },
        ],
      },
      {
        name: 'Nashik',
        mandals: [
          { name: 'Nashik', type: 'city' },
          { name: 'Malegaon', type: 'city' },
          { name: 'Sinnar', type: 'town' },
          { name: 'Igatpuri', type: 'mandal' },
        ],
      },
      {
        name: 'Aurangabad',
        mandals: [
          { name: 'Aurangabad', type: 'city' },
          { name: 'Paithan', type: 'town' },
          { name: 'Vaijapur', type: 'mandal' },
          { name: 'Gangapur', type: 'mandal' },
        ],
      },
      {
        name: 'Solapur',
        mandals: [
          { name: 'Solapur', type: 'city' },
          { name: 'Pandharpur', type: 'town' },
          { name: 'Barshi', type: 'town' },
          { name: 'Akkalkot', type: 'mandal' },
        ],
      },
      {
        name: 'Kolhapur',
        mandals: [
          { name: 'Kolhapur', type: 'city' },
          { name: 'Ichalkaranji', type: 'town' },
          { name: 'Panhala', type: 'mandal' },
          { name: 'Kagal', type: 'mandal' },
        ],
      },
      {
        name: 'Raigad',
        mandals: [
          { name: 'Alibag', type: 'city' },
          { name: 'Panvel', type: 'city' },
          { name: 'Uran', type: 'town' },
          { name: 'Pen', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Manipur',
    districts: [
      {
        name: 'Imphal East',
        mandals: [
          { name: 'Imphal', type: 'city' },
          { name: 'Porompat', type: 'town' },
          { name: 'Jiribam', type: 'mandal' },
        ],
      },
      {
        name: 'Imphal West',
        mandals: [
          { name: 'Lamphelpat', type: 'town' },
          { name: 'Wangoi', type: 'mandal' },
          { name: 'Sekmai', type: 'mandal' },
        ],
      },
      {
        name: 'Thoubal',
        mandals: [
          { name: 'Thoubal', type: 'town' },
          { name: 'Lilong', type: 'mandal' },
          { name: 'Yairipok', type: 'mandal' },
        ],
      },
      {
        name: 'Bishnupur',
        mandals: [
          { name: 'Bishnupur', type: 'town' },
          { name: 'Moirang', type: 'mandal' },
          { name: 'Nambol', type: 'mandal' },
        ],
      },
      {
        name: 'Churachandpur',
        mandals: [
          { name: 'Churachandpur', type: 'town' },
          { name: 'Singngat', type: 'mandal' },
          { name: 'Thanlon', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Meghalaya',
    districts: [
      {
        name: 'East Khasi Hills',
        mandals: [
          { name: 'Shillong', type: 'city' },
          { name: 'Nongstoin', type: 'town' },
          { name: 'Mawlai', type: 'mandal' },
        ],
      },
      {
        name: 'West Garo Hills',
        mandals: [
          { name: 'Tura', type: 'city' },
          { name: 'Dalu', type: 'mandal' },
          { name: 'Tikrikilla', type: 'mandal' },
        ],
      },
      {
        name: 'Ri Bhoi',
        mandals: [
          { name: 'Nongpoh', type: 'town' },
          { name: 'Byrnihat', type: 'mandal' },
        ],
      },
      {
        name: 'South Garo Hills',
        mandals: [
          { name: 'Baghmara', type: 'town' },
          { name: 'Gasuapara', type: 'mandal' },
        ],
      },
      {
        name: 'Jaintia Hills',
        mandals: [
          { name: 'Jowai', type: 'town' },
          { name: 'Khliehriat', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Mizoram',
    districts: [
      {
        name: 'Aizawl',
        mandals: [
          { name: 'Aizawl', type: 'city' },
          { name: 'Darlawn', type: 'town' },
          { name: 'Thingsulthliah', type: 'mandal' },
        ],
      },
      {
        name: 'Lunglei',
        mandals: [
          { name: 'Lunglei', type: 'town' },
          { name: 'Hnahthial', type: 'mandal' },
        ],
      },
      {
        name: 'Champhai',
        mandals: [
          { name: 'Champhai', type: 'town' },
          { name: 'Khawzawl', type: 'mandal' },
        ],
      },
      {
        name: 'Kolasib',
        mandals: [
          { name: 'Kolasib', type: 'town' },
          { name: 'Vairengte', type: 'mandal' },
        ],
      },
      {
        name: 'Serchhip',
        mandals: [
          { name: 'Serchhip', type: 'town' },
          { name: 'East Lungdar', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Nagaland',
    districts: [
      {
        name: 'Kohima',
        mandals: [
          { name: 'Kohima', type: 'city' },
          { name: 'Jakhama', type: 'mandal' },
          { name: 'Tseminyu', type: 'mandal' },
        ],
      },
      {
        name: 'Dimapur',
        mandals: [
          { name: 'Dimapur', type: 'city' },
          { name: 'Chumukedima', type: 'town' },
        ],
      },
      {
        name: 'Mokokchung',
        mandals: [
          { name: 'Mokokchung', type: 'town' },
          { name: 'Mangkolemba', type: 'mandal' },
        ],
      },
      {
        name: 'Tuensang',
        mandals: [
          { name: 'Tuensang', type: 'town' },
          { name: 'Noklak', type: 'mandal' },
        ],
      },
      {
        name: 'Mon',
        mandals: [
          { name: 'Mon', type: 'town' },
          { name: 'Aboi', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Odisha',
    districts: [
      {
        name: 'Khordha',
        mandals: [
          { name: 'Bhubaneswar', type: 'city' },
          { name: 'Jatni', type: 'town' },
          { name: 'Balugaon', type: 'mandal' },
        ],
      },
      {
        name: 'Cuttack',
        mandals: [
          { name: 'Cuttack', type: 'city' },
          { name: 'Banki', type: 'town' },
          { name: 'Athagarh', type: 'mandal' },
        ],
      },
      {
        name: 'Ganjam',
        mandals: [
          { name: 'Berhampur', type: 'city' },
          { name: 'Chhatrapur', type: 'town' },
          { name: 'Gopalpur', type: 'mandal' },
        ],
      },
      {
        name: 'Puri',
        mandals: [
          { name: 'Puri', type: 'city' },
          { name: 'Konark', type: 'town' },
          { name: 'Pipili', type: 'mandal' },
        ],
      },
      {
        name: 'Balasore',
        mandals: [
          { name: 'Balasore', type: 'city' },
          { name: 'Jaleswar', type: 'town' },
          { name: 'Soro', type: 'mandal' },
        ],
      },
      {
        name: 'Sambalpur',
        mandals: [
          { name: 'Sambalpur', type: 'city' },
          { name: 'Hirakud', type: 'town' },
          { name: 'Burla', type: 'mandal' },
        ],
      },
      {
        name: 'Angul',
        mandals: [
          { name: 'Angul', type: 'town' },
          { name: 'Talcher', type: 'town' },
          { name: 'Pallahara', type: 'mandal' },
        ],
      },
      {
        name: 'Mayurbhanj',
        mandals: [
          { name: 'Baripada', type: 'city' },
          { name: 'Rairangpur', type: 'town' },
          { name: 'Udala', type: 'mandal' },
        ],
      },
      {
        name: 'Sundargarh',
        mandals: [
          { name: 'Rourkela', type: 'city' },
          { name: 'Sundargarh', type: 'town' },
          { name: 'Rajgangpur', type: 'mandal' },
        ],
      },
      {
        name: 'Kendrapara',
        mandals: [
          { name: 'Kendrapara', type: 'town' },
          { name: 'Pattamundai', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Punjab',
    districts: [
      {
        name: 'Ludhiana',
        mandals: [
          { name: 'Ludhiana', type: 'city' },
          { name: 'Khanna', type: 'town' },
          { name: 'Raikot', type: 'mandal' },
          { name: 'Samrala', type: 'mandal' },
        ],
      },
      {
        name: 'Amritsar',
        mandals: [
          { name: 'Amritsar', type: 'city' },
          { name: 'Ajnala', type: 'town' },
          { name: 'Attari', type: 'mandal' },
        ],
      },
      {
        name: 'Jalandhar',
        mandals: [
          { name: 'Jalandhar', type: 'city' },
          { name: 'Phagwara', type: 'town' },
          { name: 'Nakodar', type: 'mandal' },
        ],
      },
      {
        name: 'Patiala',
        mandals: [
          { name: 'Patiala', type: 'city' },
          { name: 'Rajpura', type: 'town' },
          { name: 'Nabha', type: 'mandal' },
        ],
      },
      {
        name: 'Bathinda',
        mandals: [
          { name: 'Bathinda', type: 'city' },
          { name: 'Talwandi Sabo', type: 'town' },
          { name: 'Rampura Phul', type: 'mandal' },
        ],
      },
      {
        name: 'Mohali',
        mandals: [
          { name: 'Mohali', type: 'city' },
          { name: 'Kharar', type: 'town' },
          { name: 'Derabassi', type: 'mandal' },
        ],
      },
      {
        name: 'Hoshiarpur',
        mandals: [
          { name: 'Hoshiarpur', type: 'city' },
          { name: 'Mukerian', type: 'town' },
          { name: 'Garhshankar', type: 'mandal' },
        ],
      },
      {
        name: 'Firozpur',
        mandals: [
          { name: 'Firozpur', type: 'city' },
          { name: 'Zira', type: 'town' },
          { name: 'Fazilka', type: 'mandal' },
        ],
      },
      {
        name: 'Moga',
        mandals: [
          { name: 'Moga', type: 'city' },
          { name: 'Baghapurana', type: 'mandal' },
          { name: 'Nihal Singh Wala', type: 'mandal' },
        ],
      },
      {
        name: 'Kapurthala',
        mandals: [
          { name: 'Kapurthala', type: 'city' },
          { name: 'Sultanpur Lodhi', type: 'town' },
          { name: 'Phagwara', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Rajasthan',
    districts: [
      {
        name: 'Jaipur',
        mandals: [
          { name: 'Jaipur', type: 'city' },
          { name: 'Sanganer', type: 'town' },
          { name: 'Amber', type: 'town' },
          { name: 'Chaksu', type: 'mandal' },
        ],
      },
      {
        name: 'Jodhpur',
        mandals: [
          { name: 'Jodhpur', type: 'city' },
          { name: 'Phalodi', type: 'town' },
          { name: 'Bilara', type: 'mandal' },
          { name: 'Osian', type: 'mandal' },
        ],
      },
      {
        name: 'Udaipur',
        mandals: [
          { name: 'Udaipur', type: 'city' },
          { name: 'Salumbar', type: 'town' },
          { name: 'Mavli', type: 'mandal' },
        ],
      },
      {
        name: 'Kota',
        mandals: [
          { name: 'Kota', type: 'city' },
          { name: 'Ramganj Mandi', type: 'town' },
          { name: 'Sangod', type: 'mandal' },
        ],
      },
      {
        name: 'Bikaner',
        mandals: [
          { name: 'Bikaner', type: 'city' },
          { name: 'Nokha', type: 'town' },
          { name: 'Kolayat', type: 'mandal' },
        ],
      },
      {
        name: 'Ajmer',
        mandals: [
          { name: 'Ajmer', type: 'city' },
          { name: 'Pushkar', type: 'town' },
          { name: 'Kishangarh', type: 'town' },
          { name: 'Nasirabad', type: 'mandal' },
        ],
      },
      {
        name: 'Alwar',
        mandals: [
          { name: 'Alwar', type: 'city' },
          { name: 'Behror', type: 'town' },
          { name: 'Tijara', type: 'mandal' },
        ],
      },
      {
        name: 'Bharatpur',
        mandals: [
          { name: 'Bharatpur', type: 'city' },
          { name: 'Kumher', type: 'town' },
          { name: 'Deeg', type: 'mandal' },
        ],
      },
      {
        name: 'Sikar',
        mandals: [
          { name: 'Sikar', type: 'city' },
          { name: 'Fatehpur', type: 'town' },
          { name: 'Ramgarh', type: 'mandal' },
        ],
      },
      {
        name: 'Pali',
        mandals: [
          { name: 'Pali', type: 'city' },
          { name: 'Sojat', type: 'town' },
          { name: 'Jaitaran', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Sikkim',
    districts: [
      {
        name: 'East Sikkim',
        mandals: [
          { name: 'Gangtok', type: 'city' },
          { name: 'Rongli', type: 'town' },
          { name: 'Pakyong', type: 'mandal' },
        ],
      },
      {
        name: 'West Sikkim',
        mandals: [
          { name: 'Geyzing', type: 'town' },
          { name: 'Jorethang', type: 'mandal' },
        ],
      },
      {
        name: 'North Sikkim',
        mandals: [
          { name: 'Mangan', type: 'town' },
          { name: 'Chungthang', type: 'mandal' },
        ],
      },
      {
        name: 'South Sikkim',
        mandals: [
          { name: 'Namchi', type: 'town' },
          { name: 'Ravangla', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Tamil Nadu',
    districts: [
      {
        name: 'Chennai',
        mandals: [
          { name: 'Chennai', type: 'city' },
          { name: 'T. Nagar', type: 'town' },
          { name: 'Anna Nagar', type: 'mandal' },
          { name: 'Adyar', type: 'mandal' },
        ],
      },
      {
        name: 'Coimbatore',
        mandals: [
          { name: 'Coimbatore', type: 'city' },
          { name: 'Pollachi', type: 'town' },
          { name: 'Mettupalayam', type: 'town' },
          { name: 'Valparai', type: 'mandal' },
        ],
      },
      {
        name: 'Madurai',
        mandals: [
          { name: 'Madurai', type: 'city' },
          { name: 'Usilampatti', type: 'town' },
          { name: 'Melur', type: 'mandal' },
        ],
      },
      {
        name: 'Tiruchirappalli',
        mandals: [
          { name: 'Tiruchirappalli', type: 'city' },
          { name: 'Srirangam', type: 'town' },
          { name: 'Lalgudi', type: 'mandal' },
        ],
      },
      {
        name: 'Salem',
        mandals: [
          { name: 'Salem', type: 'city' },
          { name: 'Mettur', type: 'town' },
          { name: 'Attur', type: 'mandal' },
        ],
      },
      {
        name: 'Tirunelveli',
        mandals: [
          { name: 'Tirunelveli', type: 'city' },
          { name: 'Palayamkottai', type: 'town' },
          { name: 'Ambasamudram', type: 'mandal' },
        ],
      },
      {
        name: 'Vellore',
        mandals: [
          { name: 'Vellore', type: 'city' },
          { name: 'Katpadi', type: 'town' },
          { name: 'Arcot', type: 'mandal' },
        ],
      },
      {
        name: 'Erode',
        mandals: [
          { name: 'Erode', type: 'city' },
          { name: 'Gobichettipalayam', type: 'town' },
          { name: 'Bhavani', type: 'mandal' },
        ],
      },
      {
        name: 'Thanjavur',
        mandals: [
          { name: 'Thanjavur', type: 'city' },
          { name: 'Kumbakonam', type: 'town' },
          { name: 'Pattukkottai', type: 'mandal' },
        ],
      },
      {
        name: 'Kanyakumari',
        mandals: [
          { name: 'Nagercoil', type: 'city' },
          { name: 'Kanyakumari', type: 'town' },
          { name: 'Padmanabhapuram', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Telangana',
    districts: [
      {
        name: 'Hyderabad',
        mandals: [
          { name: 'Secunderabad', type: 'city' },
          { name: 'Kukatpally', type: 'mandal' },
          { name: 'L.B. Nagar', type: 'mandal' },
          { name: 'Charminar', type: 'mandal' },
          { name: 'Khairatabad', type: 'mandal' },
          { name: 'Begumpet', type: 'mandal' },
        ],
      },
      {
        name: 'Rangareddy',
        mandals: [
          { name: 'Madhapur', type: 'town' },
          { name: 'Shamshabad', type: 'mandal' },
          { name: 'Rajendranagar', type: 'mandal' },
          { name: 'Serilingampally', type: 'mandal' },
          { name: 'Shadnagar', type: 'mandal' },
        ],
      },
      {
        name: 'Medchal-Malkajgiri',
        mandals: [
          { name: 'Kompally', type: 'town' },
          { name: 'Medchal', type: 'mandal' },
          { name: 'Keesara', type: 'mandal' },
          { name: 'Ghatkesar', type: 'mandal' },
        ],
      },
      {
        name: 'Warangal Urban',
        mandals: [
          { name: 'Warangal', type: 'city' },
          { name: 'Hanamkonda', type: 'town' },
          { name: 'Kazipet', type: 'mandal' },
        ],
      },
      {
        name: 'Nizamabad',
        mandals: [
          { name: 'Nizamabad', type: 'city' },
          { name: 'Bodhan', type: 'town' },
          { name: 'Armoor', type: 'mandal' },
          { name: 'Kamareddy', type: 'mandal' },
        ],
      },
      {
        name: 'Karimnagar',
        mandals: [
          { name: 'Karimnagar', type: 'city' },
          { name: 'Jagtial', type: 'town' },
          { name: 'Sircilla', type: 'town' },
          { name: 'Huzurabad', type: 'mandal' },
        ],
      },
      {
        name: 'Khammam',
        mandals: [
          { name: 'Khammam', type: 'city' },
          { name: 'Kothagudem', type: 'town' },
          { name: 'Madhira', type: 'mandal' },
          { name: 'Wyra', type: 'mandal' },
        ],
      },
      {
        name: 'Nalgonda',
        mandals: [
          { name: 'Nalgonda', type: 'city' },
          { name: 'Miryalaguda', type: 'town' },
          { name: 'Suryapet', type: 'town' },
          { name: 'Devarakonda', type: 'mandal' },
        ],
      },
      {
        name: 'Mahabubnagar',
        mandals: [
          { name: 'Mahabubnagar', type: 'city' },
          { name: 'Gadwal', type: 'town' },
          { name: 'Wanaparthy', type: 'town' },
          { name: 'Narayanpet', type: 'mandal' },
        ],
      },
      {
        name: 'Adilabad',
        mandals: [
          { name: 'Adilabad', type: 'city' },
          { name: 'Mancherial', type: 'town' },
          { name: 'Nirmal', type: 'town' },
          { name: 'Asifabad', type: 'mandal' },
        ],
      },
      {
        name: 'Sangareddy',
        mandals: [
          { name: 'Sangareddy', type: 'town' },
          { name: 'Zahirabad', type: 'town' },
          { name: 'Patancheru', type: 'mandal' },
          { name: 'Narayankhed', type: 'mandal' },
        ],
      },
      {
        name: 'Siddipet',
        mandals: [
          { name: 'Siddipet', type: 'town' },
          { name: 'Gajwel', type: 'mandal' },
          { name: 'Dubbak', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Tripura',
    districts: [
      {
        name: 'West Tripura',
        mandals: [
          { name: 'Agartala', type: 'city' },
          { name: 'Mohanpur', type: 'town' },
          { name: 'Teliamura', type: 'mandal' },
        ],
      },
      {
        name: 'South Tripura',
        mandals: [
          { name: 'Udaipur', type: 'town' },
          { name: 'Belonia', type: 'mandal' },
        ],
      },
      {
        name: 'North Tripura',
        mandals: [
          { name: 'Dharmanagar', type: 'town' },
          { name: 'Kanchanpur', type: 'mandal' },
        ],
      },
      {
        name: 'Dhalai',
        mandals: [
          { name: 'Ambassa', type: 'town' },
          { name: 'Kamalpur', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Uttar Pradesh',
    districts: [
      {
        name: 'Lucknow',
        mandals: [
          { name: 'Lucknow', type: 'city' },
          { name: 'Chinhat', type: 'town' },
          { name: 'Malihabad', type: 'mandal' },
          { name: 'Mohanlalganj', type: 'mandal' },
        ],
      },
      {
        name: 'Kanpur Nagar',
        mandals: [
          { name: 'Kanpur', type: 'city' },
          { name: 'Ghatampur', type: 'town' },
          { name: 'Bilhaur', type: 'mandal' },
        ],
      },
      {
        name: 'Ghaziabad',
        mandals: [
          { name: 'Ghaziabad', type: 'city' },
          { name: 'Loni', type: 'town' },
          { name: 'Modinagar', type: 'town' },
          { name: 'Muradnagar', type: 'mandal' },
        ],
      },
      {
        name: 'Agra',
        mandals: [
          { name: 'Agra', type: 'city' },
          { name: 'Fatehabad', type: 'town' },
          { name: 'Kheragarh', type: 'mandal' },
        ],
      },
      {
        name: 'Meerut',
        mandals: [
          { name: 'Meerut', type: 'city' },
          { name: 'Mawana', type: 'town' },
          { name: 'Sardhana', type: 'mandal' },
        ],
      },
      {
        name: 'Varanasi',
        mandals: [
          { name: 'Varanasi', type: 'city' },
          { name: 'Ramnagar', type: 'town' },
          { name: 'Pindra', type: 'mandal' },
        ],
      },
      {
        name: 'Allahabad',
        mandals: [
          { name: 'Prayagraj', type: 'city' },
          { name: 'Phulpur', type: 'town' },
          { name: 'Soraon', type: 'mandal' },
        ],
      },
      {
        name: 'Bareilly',
        mandals: [
          { name: 'Bareilly', type: 'city' },
          { name: 'Aonla', type: 'town' },
          { name: 'Baheri', type: 'mandal' },
        ],
      },
      {
        name: 'Aligarh',
        mandals: [
          { name: 'Aligarh', type: 'city' },
          { name: 'Khair', type: 'town' },
          { name: 'Atrauli', type: 'mandal' },
        ],
      },
      {
        name: 'Moradabad',
        mandals: [
          { name: 'Moradabad', type: 'city' },
          { name: 'Thakurdwara', type: 'town' },
          { name: 'Bilari', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Uttarakhand',
    districts: [
      {
        name: 'Dehradun',
        mandals: [
          { name: 'Dehradun', type: 'city' },
          { name: 'Mussoorie', type: 'town' },
          { name: 'Rishikesh', type: 'town' },
          { name: 'Doiwala', type: 'mandal' },
        ],
      },
      {
        name: 'Haridwar',
        mandals: [
          { name: 'Haridwar', type: 'city' },
          { name: 'Roorkee', type: 'city' },
          { name: 'Laksar', type: 'mandal' },
        ],
      },
      {
        name: 'Nainital',
        mandals: [
          { name: 'Haldwani', type: 'city' },
          { name: 'Nainital', type: 'town' },
          { name: 'Ramnagar', type: 'mandal' },
        ],
      },
      {
        name: 'Udham Singh Nagar',
        mandals: [
          { name: 'Rudrapur', type: 'city' },
          { name: 'Kashipur', type: 'town' },
          { name: 'Kichha', type: 'mandal' },
        ],
      },
      {
        name: 'Almora',
        mandals: [
          { name: 'Almora', type: 'town' },
          { name: 'Ranikhet', type: 'town' },
          { name: 'Dwarahat', type: 'mandal' },
        ],
      },
      {
        name: 'Pauri Garhwal',
        mandals: [
          { name: 'Pauri', type: 'town' },
          { name: 'Kotdwar', type: 'town' },
          { name: 'Srinagar', type: 'mandal' },
        ],
      },
      {
        name: 'Tehri Garhwal',
        mandals: [
          { name: 'Tehri', type: 'town' },
          { name: 'Narendranagar', type: 'mandal' },
        ],
      },
      {
        name: 'Pithoragarh',
        mandals: [
          { name: 'Pithoragarh', type: 'town' },
          { name: 'Dharchula', type: 'mandal' },
        ],
      },
      {
        name: 'Champawat',
        mandals: [
          { name: 'Champawat', type: 'town' },
          { name: 'Tanakpur', type: 'mandal' },
        ],
      },
      {
        name: 'Uttarkashi',
        mandals: [
          { name: 'Uttarkashi', type: 'town' },
          { name: 'Barkot', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'West Bengal',
    districts: [
      {
        name: 'Kolkata',
        mandals: [
          { name: 'Kolkata', type: 'city' },
          { name: 'Jadavpur', type: 'town' },
          { name: 'Behala', type: 'mandal' },
          { name: 'Tollygunge', type: 'mandal' },
        ],
      },
      {
        name: 'Howrah',
        mandals: [
          { name: 'Howrah', type: 'city' },
          { name: 'Bally', type: 'town' },
          { name: 'Uluberia', type: 'mandal' },
        ],
      },
      {
        name: 'North 24 Parganas',
        mandals: [
          { name: 'Barasat', type: 'city' },
          { name: 'Barrackpore', type: 'town' },
          { name: 'Basirhat', type: 'town' },
          { name: 'Habra', type: 'mandal' },
        ],
      },
      {
        name: 'South 24 Parganas',
        mandals: [
          { name: 'Baruipur', type: 'city' },
          { name: 'Canning', type: 'town' },
          { name: 'Diamond Harbour', type: 'mandal' },
        ],
      },
      {
        name: 'Darjeeling',
        mandals: [
          { name: 'Siliguri', type: 'city' },
          { name: 'Darjeeling', type: 'town' },
          { name: 'Kalimpong', type: 'town' },
          { name: 'Kurseong', type: 'mandal' },
        ],
      },
      {
        name: 'Murshidabad',
        mandals: [
          { name: 'Baharampur', type: 'city' },
          { name: 'Kandi', type: 'town' },
          { name: 'Jangipur', type: 'mandal' },
        ],
      },
      {
        name: 'Hooghly',
        mandals: [
          { name: 'Chinsurah', type: 'city' },
          { name: 'Serampore', type: 'town' },
          { name: 'Arambagh', type: 'mandal' },
        ],
      },
      {
        name: 'Nadia',
        mandals: [
          { name: 'Krishnanagar', type: 'city' },
          { name: 'Ranaghat', type: 'town' },
          { name: 'Kalyani', type: 'town' },
          { name: 'Nabadwip', type: 'mandal' },
        ],
      },
      {
        name: 'Barddhaman',
        mandals: [
          { name: 'Bardhaman', type: 'city' },
          { name: 'Asansol', type: 'city' },
          { name: 'Durgapur', type: 'city' },
          { name: 'Kalna', type: 'mandal' },
        ],
      },
      {
        name: 'Malda',
        mandals: [
          { name: 'Malda', type: 'city' },
          { name: 'English Bazar', type: 'town' },
          { name: 'Kaliachak', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Andaman and Nicobar Islands',
    districts: [
      {
        name: 'Nicobar',
        mandals: [
          { name: 'Car Nicobar', type: 'town' },
          { name: 'Nancowry', type: 'mandal' },
        ],
      },
      {
        name: 'North and Middle Andaman',
        mandals: [
          { name: 'Mayabunder', type: 'town' },
          { name: 'Rangat', type: 'mandal' },
        ],
      },
      {
        name: 'South Andaman',
        mandals: [
          { name: 'Port Blair', type: 'city' },
          { name: 'Ferrargunj', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Chandigarh',
    districts: [
      {
        name: 'Chandigarh',
        mandals: [
          { name: 'Chandigarh', type: 'city' },
          { name: 'Sector 17', type: 'town' },
          { name: 'Mani Majra', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    districts: [
      {
        name: 'Dadra and Nagar Haveli',
        mandals: [
          { name: 'Silvassa', type: 'city' },
          { name: 'Naroli', type: 'mandal' },
        ],
      },
      {
        name: 'Daman',
        mandals: [
          { name: 'Daman', type: 'city' },
          { name: 'Nani Daman', type: 'mandal' },
        ],
      },
      {
        name: 'Diu',
        mandals: [
          { name: 'Diu', type: 'town' },
          { name: 'Ghogla', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Lakshadweep',
    districts: [
      {
        name: 'Lakshadweep',
        mandals: [
          { name: 'Kavaratti', type: 'city' },
          { name: 'Agatti', type: 'town' },
          { name: 'Minicoy', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Delhi',
    districts: [
      {
        name: 'Central Delhi',
        mandals: [
          { name: 'Connaught Place', type: 'city' },
          { name: 'Karol Bagh', type: 'town' },
          { name: 'Paharganj', type: 'mandal' },
        ],
      },
      {
        name: 'New Delhi',
        mandals: [
          { name: 'Chanakyapuri', type: 'city' },
          { name: 'Vasant Vihar', type: 'town' },
          { name: 'Safdarjung', type: 'mandal' },
        ],
      },
      {
        name: 'North Delhi',
        mandals: [
          { name: 'Civil Lines', type: 'city' },
          { name: 'Model Town', type: 'town' },
          { name: 'Narela', type: 'mandal' },
        ],
      },
      {
        name: 'South Delhi',
        mandals: [
          { name: 'Hauz Khas', type: 'city' },
          { name: 'Saket', type: 'town' },
          { name: 'Greater Kailash', type: 'town' },
          { name: 'Mehrauli', type: 'mandal' },
        ],
      },
      {
        name: 'East Delhi',
        mandals: [
          { name: 'Preet Vihar', type: 'city' },
          { name: 'Mayur Vihar', type: 'town' },
          { name: 'Laxmi Nagar', type: 'mandal' },
        ],
      },
      {
        name: 'West Delhi',
        mandals: [
          { name: 'Rajouri Garden', type: 'city' },
          { name: 'Janakpuri', type: 'town' },
          { name: 'Dwarka', type: 'town' },
          { name: 'Punjabi Bagh', type: 'mandal' },
        ],
      },
      {
        name: 'North East Delhi',
        mandals: [
          { name: 'Shahdara', type: 'city' },
          { name: 'Seelampur', type: 'town' },
          { name: 'Karawal Nagar', type: 'mandal' },
        ],
      },
      {
        name: 'North West Delhi',
        mandals: [
          { name: 'Rohini', type: 'city' },
          { name: 'Pitampura', type: 'town' },
          { name: 'Bawana', type: 'mandal' },
        ],
      },
      {
        name: 'South East Delhi',
        mandals: [
          { name: 'Defence Colony', type: 'city' },
          { name: 'Kalkaji', type: 'town' },
          { name: 'Okhla', type: 'mandal' },
        ],
      },
      {
        name: 'South West Delhi',
        mandals: [
          { name: 'Vasant Kunj', type: 'city' },
          { name: 'Kapashera', type: 'mandal' },
          { name: 'Najafgarh', type: 'mandal' },
        ],
      },
      {
        name: 'Shahdara',
        mandals: [
          { name: 'Vivek Vihar', type: 'town' },
          { name: 'Dilshad Garden', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Puducherry',
    districts: [
      {
        name: 'Puducherry',
        mandals: [
          { name: 'Puducherry', type: 'city' },
          { name: 'Oulgaret', type: 'town' },
          { name: 'Villianur', type: 'mandal' },
        ],
      },
      {
        name: 'Karaikal',
        mandals: [
          { name: 'Karaikal', type: 'town' },
          { name: 'Thirunallar', type: 'mandal' },
        ],
      },
      {
        name: 'Mahe',
        mandals: [
          { name: 'Mahe', type: 'town' },
        ],
      },
      {
        name: 'Yanam',
        mandals: [
          { name: 'Yanam', type: 'town' },
        ],
      },
    ],
  },
  {
    name: 'Jammu and Kashmir',
    districts: [
      {
        name: 'Srinagar',
        mandals: [
          { name: 'Srinagar', type: 'city' },
          { name: 'Soura', type: 'town' },
          { name: 'Hazratbal', type: 'mandal' },
        ],
      },
      {
        name: 'Jammu',
        mandals: [
          { name: 'Jammu', type: 'city' },
          { name: 'Akhnoor', type: 'town' },
          { name: 'Bishnah', type: 'mandal' },
        ],
      },
      {
        name: 'Anantnag',
        mandals: [
          { name: 'Anantnag', type: 'city' },
          { name: 'Bijbehara', type: 'town' },
          { name: 'Pahalgam', type: 'mandal' },
        ],
      },
      {
        name: 'Baramulla',
        mandals: [
          { name: 'Baramulla', type: 'city' },
          { name: 'Sopore', type: 'town' },
          { name: 'Uri', type: 'mandal' },
        ],
      },
      {
        name: 'Udhampur',
        mandals: [
          { name: 'Udhampur', type: 'city' },
          { name: 'Reasi', type: 'town' },
          { name: 'Chenani', type: 'mandal' },
        ],
      },
    ],
  },
  {
    name: 'Ladakh',
    districts: [
      {
        name: 'Leh',
        mandals: [
          { name: 'Leh', type: 'city' },
          { name: 'Nubra', type: 'mandal' },
          { name: 'Diskit', type: 'mandal' },
        ],
      },
      {
        name: 'Kargil',
        mandals: [
          { name: 'Kargil', type: 'city' },
          { name: 'Zanskar', type: 'mandal' },
          { name: 'Drass', type: 'mandal' },
        ],
      },
    ],
  },
];

// Helper functions
export const getStateNames = (): string[] => {
  return ['All States', ...indianStates.map(state => state.name)];
};

export const getDistrictsByState = (stateName: string): string[] => {
  if (stateName === 'All States' || !stateName) {
    return ['All Districts'];
  }
  
  const state = indianStates.find(s => s.name === stateName);
  if (!state) return ['All Districts'];
  
  return ['All Districts', ...state.districts.map(d => d.name)];
};

export const getMandalsByDistrict = (stateName: string, districtName: string): string[] => {
  if (districtName === 'All Districts' || !districtName || !stateName || stateName === 'All States') {
    return ['All Mandals'];
  }
  
  const state = indianStates.find(s => s.name === stateName);
  if (!state) return ['All Mandals'];
  
  const district = state.districts.find(d => d.name === districtName);
  if (!district) return ['All Mandals'];
  
  return ['All Mandals', ...district.mandals.map(m => m.name)];
};

export default indianStates;
