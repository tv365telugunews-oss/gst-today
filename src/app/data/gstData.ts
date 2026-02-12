// Comprehensive HSN Codes Database
export const hsnData = [
  // Chapter 01-10: Live Animals, Meat, Fish, Dairy, Vegetables, Fruits, Cereals
  { code: '0101', description: 'Live horses, asses, mules and hinnies', rate: '0%', category: 'Live Animals' },
  { code: '0102', description: 'Live bovine animals', rate: '0%', category: 'Live Animals' },
  { code: '0201', description: 'Meat of bovine animals, fresh or chilled', rate: '0%', category: 'Meat' },
  { code: '0202', description: 'Meat of bovine animals, frozen', rate: '12%', category: 'Meat' },
  { code: '0203', description: 'Meat of swine, fresh, chilled or frozen', rate: '0%', category: 'Meat' },
  { code: '0207', description: 'Meat and edible offal of poultry', rate: '0%', category: 'Meat' },
  { code: '0301', description: 'Live fish', rate: '0%', category: 'Fish' },
  { code: '0302', description: 'Fish, fresh or chilled', rate: '0%', category: 'Fish' },
  { code: '0303', description: 'Fish, frozen', rate: '5%', category: 'Fish' },
  { code: '0305', description: 'Fish, dried, salted or in brine; smoked fish', rate: '5%', category: 'Fish' },
  { code: '0401', description: 'Milk and cream, not concentrated', rate: '0%', category: 'Dairy' },
  { code: '0402', description: 'Milk and cream, concentrated or containing added sugar', rate: '5%', category: 'Dairy' },
  { code: '0403', description: 'Buttermilk, curdled milk, cream, yogurt, kephir', rate: '5%', category: 'Dairy' },
  { code: '0405', description: 'Butter and other fats derived from milk', rate: '12%', category: 'Dairy' },
  { code: '0406', description: 'Cheese and curd', rate: '12%', category: 'Dairy' },
  { code: '0407', description: 'Birds eggs, in shell, fresh', rate: '0%', category: 'Dairy' },
  { code: '0701', description: 'Potatoes, fresh or chilled', rate: '0%', category: 'Vegetables' },
  { code: '0702', description: 'Tomatoes, fresh or chilled', rate: '0%', category: 'Vegetables' },
  { code: '0703', description: 'Onions, shallots, garlic, leeks', rate: '0%', category: 'Vegetables' },
  { code: '0704', description: 'Cabbages, cauliflowers, kohlrabi, kale', rate: '0%', category: 'Vegetables' },
  { code: '0706', description: 'Carrots, turnips, salad beetroot', rate: '0%', category: 'Vegetables' },
  { code: '0709', description: 'Other vegetables, fresh or chilled', rate: '0%', category: 'Vegetables' },
  { code: '0710', description: 'Vegetables, frozen', rate: '5%', category: 'Vegetables' },
  { code: '0801', description: 'Coconuts, Brazil nuts and cashew nuts', rate: '5%', category: 'Fruits' },
  { code: '0802', description: 'Other nuts, fresh or dried', rate: '12%', category: 'Fruits' },
  { code: '0803', description: 'Bananas, including plantains, fresh or dried', rate: '0%', category: 'Fruits' },
  { code: '0804', description: 'Dates, figs, pineapples, avocados, guavas, mangoes', rate: '0%', category: 'Fruits' },
  { code: '0805', description: 'Citrus fruit, fresh or dried', rate: '0%', category: 'Fruits' },
  { code: '0806', description: 'Grapes, fresh or dried', rate: '0%', category: 'Fruits' },
  { code: '0808', description: 'Apples, pears and quinces, fresh', rate: '0%', category: 'Fruits' },
  { code: '1001', description: 'Wheat and meslin', rate: '0%', category: 'Cereals' },
  { code: '1003', description: 'Barley', rate: '0%', category: 'Cereals' },
  { code: '1005', description: 'Maize (corn)', rate: '0%', category: 'Cereals' },
  { code: '1006', description: 'Rice', rate: '0%', category: 'Cereals' },
  { code: '1007', description: 'Grain sorghum', rate: '0%', category: 'Cereals' },
  { code: '1008', description: 'Buckwheat, millet and canary seed', rate: '0%', category: 'Cereals' },
  
  // Chapter 17-24: Sugars, Bakery, Beverages, Tobacco
  { code: '1701', description: 'Cane or beet sugar and chemically pure sucrose', rate: '5%', category: 'Sugars' },
  { code: '1702', description: 'Other sugars, including lactose, maltose, glucose', rate: '18%', category: 'Sugars' },
  { code: '1704', description: 'Sugar confectionery', rate: '18%', category: 'Sugars' },
  { code: '1901', description: 'Malt extract, food preparations of flour, meal', rate: '18%', category: 'Bakery' },
  { code: '1902', description: 'Pasta, whether or not cooked', rate: '18%', category: 'Bakery' },
  { code: '1904', description: 'Prepared foods from cereal flakes', rate: '18%', category: 'Bakery' },
  { code: '1905', description: 'Bread, pastry, cakes, biscuits', rate: '18%', category: 'Bakery' },
  { code: '2009', description: 'Fruit juices (including grape must)', rate: '12%', category: 'Beverages' },
  { code: '2201', description: 'Waters, including natural or artificial mineral waters', rate: '18%', category: 'Beverages' },
  { code: '2202', description: 'Aerated beverages, soft drinks', rate: '28%', category: 'Beverages' },
  { code: '2203', description: 'Beer made from malt', rate: '28%', category: 'Beverages' },
  { code: '2204', description: 'Wine of fresh grapes', rate: '28%', category: 'Beverages' },
  { code: '2208', description: 'Spirits, liqueurs', rate: '28%', category: 'Beverages' },
  { code: '2401', description: 'Unmanufactured tobacco', rate: '28%', category: 'Tobacco' },
  { code: '2402', description: 'Cigars, cheroots, cigarillos, cigarettes', rate: '28%', category: 'Tobacco' },
  { code: '2403', description: 'Other manufactured tobacco', rate: '28%', category: 'Tobacco' },
  
  // Chapter 27: Mineral Fuels
  { code: '2701', description: 'Coal, briquettes, ovoids', rate: '5%', category: 'Fuels' },
  { code: '2709', description: 'Petroleum oils, crude', rate: '5%', category: 'Fuels' },
  { code: '2710', description: 'Petroleum oils, refined', rate: '5%', category: 'Fuels' },
  { code: '2711', description: 'Petroleum gases (LPG, CNG)', rate: '5%', category: 'Fuels' },
  
  // Chapter 30: Pharmaceutical Products
  { code: '3001', description: 'Glands and organs for therapeutic uses', rate: '12%', category: 'Medicines' },
  { code: '3002', description: 'Human blood, animal blood, vaccines', rate: '12%', category: 'Medicines' },
  { code: '3003', description: 'Medicaments (in measured doses)', rate: '12%', category: 'Medicines' },
  { code: '3004', description: 'Medicaments (in bulk)', rate: '12%', category: 'Medicines' },
  { code: '3005', description: 'Wadding, gauze, bandages', rate: '12%', category: 'Medicines' },
  { code: '3006', description: 'Pharmaceutical goods', rate: '12%', category: 'Medicines' },
  
  // Chapter 33: Essential Oils and Cosmetics
  { code: '3303', description: 'Perfumes and toilet waters', rate: '18%', category: 'Personal Care' },
  { code: '3304', description: 'Beauty or make-up preparations', rate: '18%', category: 'Personal Care' },
  { code: '3305', description: 'Hair preparations (oils, shampoos)', rate: '18%', category: 'Personal Care' },
  { code: '3306', description: 'Oral or dental hygiene preparations (toothpaste)', rate: '18%', category: 'Personal Care' },
  { code: '3307', description: 'Shaving preparations, deodorants, bath salts', rate: '28%', category: 'Personal Care' },
  
  // Chapter 39: Plastics
  { code: '3920', description: 'Plates, sheets, film, foil of plastics', rate: '18%', category: 'Plastics' },
  { code: '3923', description: 'Articles for packing goods, of plastics', rate: '18%', category: 'Plastics' },
  { code: '3924', description: 'Tableware, kitchenware of plastics', rate: '18%', category: 'Plastics' },
  { code: '3926', description: 'Other articles of plastics', rate: '18%', category: 'Plastics' },
  
  // Chapter 48: Paper
  { code: '4801', description: 'Newsprint, in rolls or sheets', rate: '5%', category: 'Paper' },
  { code: '4802', description: 'Uncoated paper for writing, printing', rate: '12%', category: 'Paper' },
  { code: '4818', description: 'Toilet paper, handkerchiefs, towels', rate: '12%', category: 'Paper' },
  { code: '4819', description: 'Cartons, boxes, cases of paper', rate: '12%', category: 'Paper' },
  { code: '4820', description: 'Registers, account books, notebooks', rate: '12%', category: 'Paper' },
  
  // Chapter 52-62: Textiles and Garments
  { code: '5201', description: 'Cotton, not carded or combed', rate: '0%', category: 'Textiles' },
  { code: '5208', description: 'Woven fabrics of cotton', rate: '5%', category: 'Textiles' },
  { code: '6101', description: "Men's or boys' overcoats, knitted", rate: '12%', category: 'Garments' },
  { code: '6103', description: "Men's or boys' suits, knitted", rate: '12%', category: 'Garments' },
  { code: '6105', description: "Men's or boys' shirts, knitted", rate: '12%', category: 'Garments' },
  { code: '6109', description: 'T-shirts, singlets, knitted', rate: '12%', category: 'Garments' },
  { code: '6110', description: 'Jerseys, pullovers, cardigans, knitted', rate: '12%', category: 'Garments' },
  { code: '6203', description: "Men's or boys' suits", rate: '12%', category: 'Garments' },
  { code: '6204', description: "Women's or girls' suits", rate: '12%', category: 'Garments' },
  { code: '6205', description: "Men's or boys' shirts", rate: '12%', category: 'Garments' },
  { code: '6206', description: "Women's or girls' blouses", rate: '12%', category: 'Garments' },
  
  // Chapter 64: Footwear
  { code: '6401', description: 'Waterproof footwear with outer soles of rubber or plastics', rate: '5%', category: 'Footwear' },
  { code: '6402', description: 'Other footwear with outer soles and uppers of rubber or plastics', rate: '18%', category: 'Footwear' },
  { code: '6403', description: 'Footwear with outer soles of rubber/plastics/leather', rate: '18%', category: 'Footwear' },
  { code: '6404', description: 'Footwear with textile materials', rate: '12%', category: 'Footwear' },
  
  // Chapter 71: Precious Stones and Metals
  { code: '7101', description: 'Pearls, natural or cultured', rate: '3%', category: 'Jewellery' },
  { code: '7102', description: 'Diamonds', rate: '0.25%', category: 'Jewellery' },
  { code: '7103', description: 'Precious stones', rate: '3%', category: 'Jewellery' },
  { code: '7108', description: 'Gold', rate: '3%', category: 'Jewellery' },
  { code: '7113', description: 'Jewellery of precious metal or metal clad', rate: '3%', category: 'Jewellery' },
  { code: '7114', description: 'Articles of goldsmiths or silversmiths wares', rate: '3%', category: 'Jewellery' },
  { code: '7117', description: 'Imitation jewellery', rate: '18%', category: 'Jewellery' },
  
  // Chapter 84-85: Machinery and Electronics
  { code: '8415', description: 'Air conditioning machines', rate: '28%', category: 'Electronics' },
  { code: '8418', description: 'Refrigerators, freezers', rate: '28%', category: 'Electronics' },
  { code: '8421', description: 'Centrifuges, filtering or purifying machinery', rate: '18%', category: 'Machinery' },
  { code: '8443', description: 'Printing machinery', rate: '18%', category: 'Machinery' },
  { code: '8450', description: 'Washing machines', rate: '28%', category: 'Electronics' },
  { code: '8471', description: 'Automatic data processing machines (computers)', rate: '18%', category: 'Electronics' },
  { code: '8473', description: 'Parts for office machines', rate: '18%', category: 'Electronics' },
  { code: '8504', description: 'Electrical transformers', rate: '18%', category: 'Electronics' },
  { code: '8507', description: 'Electric accumulators (batteries)', rate: '28%', category: 'Electronics' },
  { code: '8509', description: 'Electro-mechanical domestic appliances', rate: '18%', category: 'Electronics' },
  { code: '8516', description: 'Electric water heaters, space heaters', rate: '18%', category: 'Electronics' },
  { code: '8517', description: 'Telephone sets, mobile phones', rate: '12%', category: 'Electronics' },
  { code: '8518', description: 'Microphones, loudspeakers, headphones', rate: '18%', category: 'Electronics' },
  { code: '8519', description: 'Sound recording or reproducing apparatus', rate: '18%', category: 'Electronics' },
  { code: '8528', description: 'Monitors, projectors, television receivers', rate: '28%', category: 'Electronics' },
  
  // Chapter 87: Vehicles
  { code: '8701', description: 'Tractors', rate: '12%', category: 'Vehicles' },
  { code: '8702', description: 'Motor vehicles for transport of 10+ persons', rate: '28%', category: 'Vehicles' },
  { code: '8703', description: 'Motor cars and passenger vehicles', rate: '28%', category: 'Vehicles' },
  { code: '8704', description: 'Motor vehicles for transport of goods', rate: '28%', category: 'Vehicles' },
  { code: '8711', description: 'Motorcycles and cycles with auxiliary motor', rate: '28%', category: 'Vehicles' },
  { code: '8712', description: 'Bicycles and other cycles', rate: '12%', category: 'Vehicles' },
  
  // Chapter 90: Optical, Medical Instruments
  { code: '9001', description: 'Optical fibres, optical fibre bundles', rate: '18%', category: 'Medical' },
  { code: '9003', description: 'Frames and mountings for spectacles', rate: '18%', category: 'Medical' },
  { code: '9004', description: 'Spectacles, goggles', rate: '18%', category: 'Medical' },
  { code: '9018', description: 'Medical, surgical, dental instruments', rate: '12%', category: 'Medical' },
  { code: '9021', description: 'Orthopaedic appliances, artificial parts of body', rate: '12%', category: 'Medical' },
  { code: '9022', description: 'X-ray apparatus', rate: '12%', category: 'Medical' },
  
  // Chapter 94: Furniture
  { code: '9401', description: 'Seats and parts thereof', rate: '18%', category: 'Furniture' },
  { code: '9403', description: 'Other furniture and parts', rate: '18%', category: 'Furniture' },
  { code: '9404', description: 'Mattress supports, mattresses', rate: '18%', category: 'Furniture' },
  { code: '9405', description: 'Lamps and lighting fittings', rate: '18%', category: 'Furniture' },
];

// Comprehensive SAC Codes Database
export const sacData = [
  // Transport Services
  { code: '996411', description: 'Passenger transport services by railways', rate: '5%', category: 'Transport' },
  { code: '996421', description: 'Passenger transport services by road', rate: '5%', category: 'Transport' },
  { code: '996431', description: 'Passenger transport services by water', rate: '5%', category: 'Transport' },
  { code: '996441', description: 'Passenger transport services by air', rate: '5%', category: 'Transport' },
  { code: '996511', description: 'Freight transport services by road', rate: '5%', category: 'Transport' },
  { code: '996521', description: 'Freight transport services by railways', rate: '5%', category: 'Transport' },
  { code: '996531', description: 'Freight transport services by water', rate: '5%', category: 'Transport' },
  { code: '996541', description: 'Freight transport services by air', rate: '5%', category: 'Transport' },
  { code: '996711', description: 'Supporting services to road transport', rate: '18%', category: 'Transport' },
  { code: '996791', description: 'Cargo handling services', rate: '18%', category: 'Transport' },
  { code: '996792', description: 'Storage and warehousing services', rate: '18%', category: 'Transport' },
  
  // Postal and Courier Services
  { code: '996811', description: 'Postal services', rate: '18%', category: 'Postal' },
  { code: '996821', description: 'Courier services', rate: '18%', category: 'Postal' },
  
  // Telecommunication Services
  { code: '996911', description: 'Wired telecommunications services', rate: '18%', category: 'Telecom' },
  { code: '996912', description: 'Wireless telecommunications services', rate: '18%', category: 'Telecom' },
  { code: '996913', description: 'Satellite telecommunications services', rate: '18%', category: 'Telecom' },
  { code: '996914', description: 'Internet telecommunications services', rate: '18%', category: 'Telecom' },
  
  // IT and Computer Services
  { code: '997111', description: 'IT consultancy and project management services', rate: '18%', category: 'IT Services' },
  { code: '997121', description: 'Computer systems service', rate: '18%', category: 'IT Services' },
  { code: '997122', description: 'Software customization and integration services', rate: '18%', category: 'IT Services' },
  { code: '997131', description: 'Software originals', rate: '18%', category: 'IT Services' },
  { code: '997132', description: 'Software downloads', rate: '18%', category: 'IT Services' },
  { code: '997141', description: 'IT infrastructure and network management services', rate: '18%', category: 'IT Services' },
  { code: '997161', description: 'Web site design and development services', rate: '18%', category: 'IT Services' },
  { code: '997162', description: 'Web site hosting and management services', rate: '18%', category: 'IT Services' },
  
  // Financial Services
  { code: '997212', description: 'Commercial banking services', rate: 'Exempt', category: 'Financial' },
  { code: '997213', description: 'Other credit granting services', rate: '18%', category: 'Financial' },
  { code: '997221', description: 'Mutual fund services', rate: '18%', category: 'Financial' },
  { code: '997231', description: 'Life insurance services', rate: '18%', category: 'Financial' },
  { code: '997241', description: 'Non-life insurance services', rate: '18%', category: 'Financial' },
  { code: '997251', description: 'Reinsurance services', rate: '18%', category: 'Financial' },
  { code: '997271', description: 'Securities broking and related services', rate: '18%', category: 'Financial' },
  { code: '997281', description: 'Foreign exchange services', rate: '18%', category: 'Financial' },
  
  // Real Estate Services
  { code: '997211', description: 'Rental services of own or leased real estate', rate: '18%', category: 'Real Estate' },
  { code: '997212', description: 'Real estate agency services', rate: '18%', category: 'Real Estate' },
  
  // Professional Services
  { code: '998211', description: 'Legal documentation and certification services', rate: '18%', category: 'Legal' },
  { code: '998212', description: 'Other legal services', rate: '18%', category: 'Legal' },
  { code: '998213', description: 'Arbitration and conciliation services', rate: '18%', category: 'Legal' },
  { code: '998221', description: 'Accounting, auditing and bookkeeping services', rate: '18%', category: 'Accounting' },
  { code: '998222', description: 'Tax consultancy and preparation services', rate: '18%', category: 'Accounting' },
  { code: '998231', description: 'Market research services', rate: '18%', category: 'Business' },
  { code: '998241', description: 'Management consulting services', rate: '18%', category: 'Consulting' },
  { code: '998242', description: 'Business consulting services', rate: '18%', category: 'Consulting' },
  { code: '998243', description: 'Public relations services', rate: '18%', category: 'Consulting' },
  { code: '998251', description: 'Architectural services', rate: '18%', category: 'Architecture' },
  { code: '998253', description: 'Engineering services', rate: '18%', category: 'Engineering' },
  { code: '998255', description: 'Project management services', rate: '18%', category: 'Engineering' },
  { code: '998271', description: 'Technical testing and analysis services', rate: '18%', category: 'Technical' },
  
  // Advertising and Media
  { code: '998311', description: 'Advertising services', rate: '18%', category: 'Advertising' },
  { code: '998312', description: 'Media representation services', rate: '18%', category: 'Advertising' },
  
  // Security and Cleaning Services
  { code: '998531', description: 'Investigation and security services', rate: '18%', category: 'Security' },
  { code: '998532', description: 'Security system services', rate: '18%', category: 'Security' },
  { code: '998542', description: 'Cleaning services', rate: '18%', category: 'Cleaning' },
  
  // Education Services
  { code: '992111', description: 'Pre-primary education services', rate: 'Exempt', category: 'Education' },
  { code: '992121', description: 'Primary education services', rate: 'Exempt', category: 'Education' },
  { code: '992131', description: 'Secondary education services', rate: 'Exempt', category: 'Education' },
  { code: '992151', description: 'Technical and vocational education services', rate: 'Exempt', category: 'Education' },
  { code: '992161', description: 'Higher education services', rate: 'Exempt', category: 'Education' },
  { code: '992191', description: 'Other education and training services', rate: '18%', category: 'Education' },
  
  // Health Services
  { code: '993111', description: 'Hospital services', rate: 'Exempt', category: 'Health' },
  { code: '993112', description: 'Medical and surgical services', rate: 'Exempt', category: 'Health' },
  { code: '993113', description: 'Dental services', rate: 'Exempt', category: 'Health' },
  { code: '993121', description: 'Veterinary services', rate: '18%', category: 'Health' },
  
  // Hospitality Services
  { code: '996311', description: 'Room or unit accommodation services', rate: '12-28%', category: 'Hospitality' },
  { code: '996331', description: 'Restaurant services', rate: '5%', category: 'Food Services' },
  { code: '996332', description: 'Event catering and other food service activities', rate: '18%', category: 'Food Services' },
  
  // Sports and Entertainment
  { code: '995411', description: 'Sports and recreational sports services', rate: '18%', category: 'Sports' },
  { code: '995421', description: 'Fitness services', rate: '18%', category: 'Sports' },
  { code: '999291', description: 'Admission to entertainment events', rate: '18%', category: 'Entertainment' },
  { code: '999292', description: 'Gambling and betting services', rate: '28%', category: 'Entertainment' },
  
  // Beauty Services
  { code: '997613', description: 'Hair and beauty treatment services', rate: '18%', category: 'Beauty' },
];

// Comprehensive Commodity Tax Rates
export const commodityRates = [
  // 0% GST Items
  { name: 'Fresh Milk', rate: '0%', category: 'Dairy', hsn: '0401' },
  { name: 'Fresh Eggs', rate: '0%', category: 'Dairy', hsn: '0407' },
  { name: 'Wheat', rate: '0%', category: 'Cereals', hsn: '1001' },
  { name: 'Rice', rate: '0%', category: 'Cereals', hsn: '1006' },
  { name: 'Maize', rate: '0%', category: 'Cereals', hsn: '1005' },
  { name: 'Potato', rate: '0%', category: 'Vegetables', hsn: '0701' },
  { name: 'Onion', rate: '0%', category: 'Vegetables', hsn: '0703' },
  { name: 'Tomato', rate: '0%', category: 'Vegetables', hsn: '0702' },
  { name: 'Fresh Vegetables', rate: '0%', category: 'Vegetables', hsn: '0701-0709' },
  { name: 'Banana', rate: '0%', category: 'Fruits', hsn: '0803' },
  { name: 'Mango', rate: '0%', category: 'Fruits', hsn: '0804' },
  { name: 'Apple', rate: '0%', category: 'Fruits', hsn: '0808' },
  { name: 'Fresh Fruits', rate: '0%', category: 'Fruits', hsn: '0803-0810' },
  { name: 'Fresh Meat', rate: '0%', category: 'Meat', hsn: '0201' },
  { name: 'Fresh Fish', rate: '0%', category: 'Fish', hsn: '0302' },
  { name: 'Salt', rate: '0%', category: 'Food', hsn: '2501' },
  { name: 'Jaggery', rate: '0%', category: 'Sugars', hsn: '1701' },
  
  // 5% GST Items
  { name: 'Coffee', rate: '5%', category: 'Beverages', hsn: '0901' },
  { name: 'Tea', rate: '5%', category: 'Beverages', hsn: '0902' },
  { name: 'Spices', rate: '5%', category: 'Food', hsn: '0904-0910' },
  { name: 'Sugar', rate: '5%', category: 'Sugars', hsn: '1701' },
  { name: 'Edible Oil', rate: '5%', category: 'Food', hsn: '1507-1515' },
  { name: 'Coal', rate: '5%', category: 'Fuels', hsn: '2701' },
  { name: 'LPG Domestic', rate: '5%', category: 'Fuels', hsn: '2711' },
  { name: 'Cashew Nuts', rate: '5%', category: 'Nuts', hsn: '0801' },
  { name: 'Raisins', rate: '5%', category: 'Fruits', hsn: '0806' },
  { name: 'Footwear up to Rs 500', rate: '5%', category: 'Footwear', hsn: '6401' },
  { name: 'Garments up to Rs 1000', rate: '5%', category: 'Garments', hsn: '6203' },
  { name: 'Cotton Fabric', rate: '5%', category: 'Textiles', hsn: '5208' },
  { name: 'Restaurant Non-AC', rate: '5%', category: 'Services', sac: '996331' },
  
  // 12% GST Items
  { name: 'Butter', rate: '12%', category: 'Dairy', hsn: '0405' },
  { name: 'Cheese', rate: '12%', category: 'Dairy', hsn: '0406' },
  { name: 'Ghee', rate: '12%', category: 'Dairy', hsn: '0405' },
  { name: 'Frozen Meat', rate: '12%', category: 'Meat', hsn: '0202' },
  { name: 'Fruit Juice', rate: '12%', category: 'Beverages', hsn: '2009' },
  { name: 'Almonds', rate: '12%', category: 'Nuts', hsn: '0802' },
  { name: 'Namkeen', rate: '12%', category: 'Food', hsn: '2106' },
  { name: 'Ayurvedic Medicines', rate: '12%', category: 'Medicines', hsn: '3003' },
  { name: 'Exercise Books', rate: '12%', category: 'Stationery', hsn: '4820' },
  { name: 'Toothpaste', rate: '12%', category: 'Personal Care', hsn: '3306' },
  { name: 'Hair Oil', rate: '12%', category: 'Personal Care', hsn: '3305' },
  { name: 'Mobile Phones', rate: '12%', category: 'Electronics', hsn: '8517' },
  { name: 'Computers', rate: '12%', category: 'Electronics', hsn: '8471' },
  { name: 'Laptops', rate: '12%', category: 'Electronics', hsn: '8471' },
  { name: 'Bicycle', rate: '12%', category: 'Vehicles', hsn: '8712' },
  { name: 'Spectacles', rate: '12%', category: 'Medical', hsn: '9004' },
  
  // 18% GST Items
  { name: 'Biscuits', rate: '18%', category: 'Bakery', hsn: '1905' },
  { name: 'Cakes', rate: '18%', category: 'Bakery', hsn: '1905' },
  { name: 'Bread', rate: '18%', category: 'Bakery', hsn: '1905' },
  { name: 'Pasta', rate: '18%', category: 'Food', hsn: '1902' },
  { name: 'Cornflakes', rate: '18%', category: 'Food', hsn: '1904' },
  { name: 'Ice Cream', rate: '18%', category: 'Dairy', hsn: '2105' },
  { name: 'Chocolates', rate: '18%', category: 'Confectionery', hsn: '1704' },
  { name: 'Mineral Water', rate: '18%', category: 'Beverages', hsn: '2201' },
  { name: 'Soaps', rate: '18%', category: 'Personal Care', hsn: '3401' },
  { name: 'Shampoo', rate: '18%', category: 'Personal Care', hsn: '3305' },
  { name: 'Detergent', rate: '18%', category: 'Home', hsn: '3402' },
  { name: 'Perfumes', rate: '18%', category: 'Personal Care', hsn: '3303' },
  { name: 'Footwear above Rs 500', rate: '18%', category: 'Footwear', hsn: '6402' },
  { name: 'Garments above Rs 1000', rate: '18%', category: 'Garments', hsn: '6203' },
  { name: 'Steel Products', rate: '18%', category: 'Metals', hsn: '7210' },
  { name: 'LED Lights', rate: '18%', category: 'Electronics', hsn: '8539' },
  { name: 'Fans', rate: '18%', category: 'Electronics', hsn: '8414' },
  { name: 'Furniture', rate: '18%', category: 'Furniture', hsn: '9403' },
  { name: 'Toys', rate: '18%', category: 'Toys', hsn: '9503' },
  { name: 'Paints', rate: '18%', category: 'Construction', hsn: '3208' },
  { name: 'Cement', rate: '18%', category: 'Construction', hsn: '2523' },
  { name: 'IT Services', rate: '18%', category: 'Services', sac: '998314' },
  { name: 'Restaurant AC', rate: '18%', category: 'Services', sac: '996331' },
  
  // 28% GST Items
  { name: 'Aerated Water', rate: '28%', category: 'Beverages', hsn: '2202' },
  { name: 'Cold Drinks', rate: '28%', category: 'Beverages', hsn: '2202' },
  { name: 'Beer', rate: '28%', category: 'Beverages', hsn: '2203' },
  { name: 'Wine', rate: '28%', category: 'Beverages', hsn: '2204' },
  { name: 'Whisky', rate: '28%', category: 'Beverages', hsn: '2208' },
  { name: 'Cigarettes', rate: '28%', category: 'Tobacco', hsn: '2402' },
  { name: 'Tobacco', rate: '28%', category: 'Tobacco', hsn: '2403' },
  { name: 'Pan Masala', rate: '28%', category: 'Tobacco', hsn: '2106' },
  { name: 'Washing Machine', rate: '28%', category: 'Electronics', hsn: '8450' },
  { name: 'Refrigerator', rate: '28%', category: 'Electronics', hsn: '8418' },
  { name: 'Air Conditioner', rate: '28%', category: 'Electronics', hsn: '8415' },
  { name: 'Television', rate: '28%', category: 'Electronics', hsn: '8528' },
  { name: 'Motor Car', rate: '28%', category: 'Vehicles', hsn: '8703' },
  { name: 'Motorcycle', rate: '28%', category: 'Vehicles', hsn: '8711' },
  { name: 'Scooter', rate: '28%', category: 'Vehicles', hsn: '8711' },
  { name: 'Deodorants', rate: '28%', category: 'Personal Care', hsn: '3307' },
  
  // Special Rates
  { name: 'Gold', rate: '3%', category: 'Jewellery', hsn: '7108' },
  { name: 'Gold Jewellery', rate: '3%', category: 'Jewellery', hsn: '7113' },
  { name: 'Silver', rate: '3%', category: 'Jewellery', hsn: '7106' },
  { name: 'Silver Jewellery', rate: '3%', category: 'Jewellery', hsn: '7113' },
  { name: 'Diamonds', rate: '0.25%', category: 'Jewellery', hsn: '7102' },
];
