import { Package, ThermometerSnowflake, Sun, Archive, Layers, ShieldCheck } from 'lucide-react';

export const resourcesData = [
  {
    id: 'pack-1',
    category: 'Packaging',
    title: 'Proper Crating Techniques',
    icon: Package,
    summary: 'Why plastic crates are superior to woven bags for tomatoes and mangoes.',
    content: `
      <h3>The Problem with Woven Bags</h3>
      <p>Traditional woven bags (gonyas) squeeze produce, causing up to 30% loss due to crushing and lack of ventilation. They accumulate heat and accelerate rotting.</p>
      
      <h3>The Solution: Ventilated Plastic Crates</h3>
      <p>Plastic crates are rigid, stackable, and ventilated. They protect the fruit from physical damage during transport.</p>
      
      <h4>Best Practices:</h4>
      <ul>
        <li><strong>Don't Overfill:</strong> Ensure the top layer is below the rim so stacked crates don't crush the fruit.</li>
        <li><strong>Line the Crates:</strong> Use paper or leaves at the bottom to prevent bruising from hard plastic.</li>
        <li><strong>Cleanliness:</strong> Wash crates with chlorinated water after every trip to prevent disease transfer.</li>
      </ul>
    `
  },
  {
    id: 'pack-2',
    category: 'Packaging',
    title: 'Modified Atmosphere Packaging (MAP)',
    icon: Archive,
    summary: 'Using specialized liners to extend shelf life without electricity.',
    content: `
      <h3>What is MAP?</h3>
      <p>Modified Atmosphere Packaging involves using specialized plastic liners that control the amount of Oxygen and Carbon Dioxide around the fruit. This slows down the ripening process.</p>
      
      <h3>Benefits for Mangoes & Avocados</h3>
      <ul>
        <li>Extends green life by 2-3 weeks.</li>
        <li>Reduces moisture loss and shriveling.</li>
        <li>Allows for slower, cheaper sea transport instead of air freight.</li>
      </ul>
    `
  },
  {
    id: 'cool-1',
    category: 'Cold Storage',
    title: 'Zero Energy Cool Chamber (ZECC)',
    icon: ThermometerSnowflake,
    summary: 'A low-cost, electricity-free fridge made from bricks and sand.',
    content: `
      <h3>How it Works</h3>
      <p>The ZECC operates on the principle of evaporative cooling. As water evaporates from the wet sand between two brick walls, it draws heat from inside the chamber.</p>
      
      <h3>Construction Steps</h3>
      <ol>
        <li>Build a double-walled structure using burnt bricks.</li>
        <li>Leave a 7.5cm gap between the inner and outer walls.</li>
        <li>Fill the gap with river sand and keep it wet constantly.</li>
        <li>Cover the top with a wet gunny bag or straw mat.</li>
      </ol>
      
      <p><strong>Result:</strong> Reduces temperature by 10-15°C and increases humidity to 95%, keeping vegetables fresh for days.</p>
    `
  },
  {
    id: 'cool-2',
    category: 'Cold Storage',
    title: 'Charcoal Cooler Construction',
    icon: Layers,
    summary: 'Building a simple charcoal-walled room for larger storage needs.',
    content: `
      <h3>The Concept</h3>
      <p>Charcoal is porous and holds water well. When wind passes through a wet charcoal wall, the air is cooled significantly.</p>
      
      <h3>Ideal For</h3>
      <p>Farmers with larger harvests of tomatoes or leafy greens who lack electricity connection.</p>
      
      <h4>Maintenance Tips:</h4>
      <ul>
        <li>Ensure the charcoal is held firmly between chicken wire mesh.</li>
        <li>Install a drip system to keep the charcoal wall continuously wet.</li>
        <li>Orient the structure to face the prevailing wind direction.</li>
      </ul>
    `
  },
  {
    id: 'sun-1',
    category: 'Solar Drying',
    title: 'Hygiene in Solar Drying',
    icon: ShieldCheck,
    summary: 'Moving from open-sun drying to hygienic solar dryers.',
    content: `
      <h3>The Risk of Open Drying</h3>
      <p>Laying fruit directly on the ground exposes it to dust, insects, birds, and animals. This leads to contamination and lower market value.</p>
      
      <h3>Raised Rack Drying</h3>
      <p>Simply raising the drying trays 1 meter off the ground improves airflow and hygiene significantly.</p>
      
      <h3>Solar Tunnel Dryers</h3>
      <p>Covering the drying racks with UV-treated polythene sheets traps heat (greenhouse effect), drying the fruit faster while protecting it from rain and dust.</p>
       
    `
  },
  {
    id: 'sun-2',
    category: 'Solar Drying',
    title: 'Preparing Mangoes for Drying',
    icon: Sun,
    summary: 'Step-by-step guide to producing export-quality dried mango chips.',
    content: `
      <h3>Preparation Steps</h3>
      <ol>
        <li><strong>Selection:</strong> Use firm, half-ripe mangoes. Over-ripe ones become mushy.</li>
        <li><strong>Washing:</strong> Wash thoroughly with clean water.</li>
        <li><strong>Peeling:</strong> Use stainless steel knives to avoid staining.</li>
        <li><strong>Slicing:</strong> Slice into uniform 5-6mm thick strips. Uniformity ensures even drying.</li>
        <li><strong>Pre-treatment:</strong> Dip slices in a mild lemon juice solution or metabisulfite to preserve the bright yellow color.</li>
        <li><strong>Drying:</strong> Arrange on trays without overlapping. Dry until moisture content is 10-15% (leathery texture).</li>
      </ol>
    `
  }
];