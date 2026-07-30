import React, { useState, useMemo } from "react";
import { Search, Calendar, Plus, MapPin, IndianRupee, X, Star, PartyPopper, Phone } from "lucide-react";

const SEED_VENDORS = [
  { id: 1, name: "Sri Balaji Catering", category: "Caterers", city: "Chennai", price: "₹350/plate", rating: 4.7, reviews: 82, phone: "98765 xxxxx", tag: "Veg & Non-Veg" },
  { id: 2, name: "Petal & Pearl Decor", category: "Decorators", city: "Coimbatore", price: "₹15,000 onwards", rating: 4.9, reviews: 46, phone: "97654 xxxxx", tag: "Wedding Stage Specialist" },
  { id: 3, name: "Click Studios", category: "Photographers", city: "Chennai", price: "₹20,000/day", rating: 4.8, reviews: 120, phone: "96543 xxxxx", tag: "Candid + Traditional" },
  { id: 4, name: "Nadhaswaram Beats", category: "Musicians", city: "Madurai", price: "₹8,000/event", rating: 4.6, reviews: 34, phone: "95432 xxxxx", tag: "Traditional Ensemble" },
  { id: 5, name: "Annapoorna Sweets & Catering", category: "Caterers", city: "Trichy", price: "₹280/plate", rating: 4.5, reviews: 58, phone: "94321 xxxxx", tag: "Pure Veg" },
  { id: 6, name: "Grand Frames Photography", category: "Photographers", city: "Bengaluru", price: "₹25,000/day", rating: 4.9, reviews: 95, phone: "93210 xxxxx", tag: "Drone + Cinematic" },
  { id: 7, name: "Marigold Events Decor", category: "Decorators", city: "Chennai", price: "₹12,000 onwards", rating: 4.4, reviews: 29, phone: "92109 xxxxx", tag: "Floral & Balloon" },
  { id: 8, name: "DJ Rhythm Squad", category: "Musicians", city: "Coimbatore", price: "₹10,000/event", rating: 4.7, reviews: 51, phone: "91098 xxxxx", tag: "DJ + Sound Setup" },
  { id: 9, name: "Royal Feast Caterers", category: "Caterers", city: "Mumbai", price: "₹450/plate", rating: 4.8, reviews: 140, phone: "90123 xxxxx", tag: "Multi-Cuisine" },
  { id: 10, name: "Sapna Decor House", category: "Decorators", city: "Delhi", price: "₹20,000 onwards", rating: 4.7, reviews: 88, phone: "89012 xxxxx", tag: "Sangeet & Mehendi Specialist" },
  { id: 11, name: "Momento Studios", category: "Photographers", city: "Pune", price: "₹18,000/day", rating: 4.6, reviews: 73, phone: "87901 xxxxx", tag: "Pre-Wedding Shoots" },
  { id: 12, name: "Baraat Band Kolkata", category: "Musicians", city: "Kolkata", price: "₹12,000/event", rating: 4.5, reviews: 40, phone: "86890 xxxxx", tag: "Brass Band" },
  { id: 13, name: "Hyderabadi Dawat Caterers", category: "Caterers", city: "Hyderabad", price: "₹320/plate", rating: 4.6, reviews: 97, phone: "85789 xxxxx", tag: "Biryani Specialist" },
  { id: 14, name: "Rajwada Events Decor", category: "Decorators", city: "Jaipur", price: "₹18,000 onwards", rating: 4.8, reviews: 61, phone: "84678 xxxxx", tag: "Royal Theme Weddings" },
  { id: 15, name: "Frame & Focus", category: "Photographers", city: "Ahmedabad", price: "₹16,000/day", rating: 4.5, reviews: 52, phone: "83567 xxxxx", tag: "Candid + Drone" },
  { id: 16, name: "Punjabi Beats DJ", category: "Musicians", city: "Chandigarh", price: "₹15,000/event", rating: 4.7, reviews: 66, phone: "82456 xxxxx", tag: "Bhangra DJ Nights" },
  { id: 17, name: "Kerala Sadya Caterers", category: "Caterers", city: "Kochi", price: "₹300/plate", rating: 4.9, reviews: 110, phone: "81345 xxxxx", tag: "Traditional Sadya" },
  { id: 18, name: "Lucknow Chikankari Decor", category: "Decorators", city: "Lucknow", price: "₹14,000 onwards", rating: 4.6, reviews: 38, phone: "80234 xxxxx", tag: "Nawabi Theme" },
];

const CATEGORIES = ["All", "Caterers", "Decorators", "Photographers", "Musicians"];
const CITIES = [
  "All Cities",
  "Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli", "Bengaluru", "Mysuru", "Mangaluru", "Hyderabad", "Vijayawada", "Visakhapatnam", "Kochi", "Thiruvananthapuram", "Kozhikode",
  "Mumbai", "Pune", "Nagpur", "Nashik", "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Panaji",
  "Delhi", "Jaipur", "Jodhpur", "Udaipur", "Chandigarh", "Ludhiana", "Amritsar", "Lucknow", "Kanpur", "Varanasi", "Agra", "Dehradun", "Shimla", "Srinagar", "Jammu",
  "Kolkata", "Patna", "Ranchi", "Bhubaneswar", "Guwahati", "Shillong", "Imphal", "Agartala",
  "Bhopal", "Indore", "Raipur",
];

function RatingBadge({ rating, reviews }) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <Star className="w-3.5 h-3.5 fill-[#B8860B] text-[#B8860B]" />
      <span className="font-semibold text-[#3A2E1F]">{rating}</span>
      <span className="text-[#8a7355]">({reviews})</span>
    </div>
  );
}

function VendorCard({ vendor }) {
  return (
    <div className="group relative bg-[#FBF6EC] border border-[#E2D2A8] rounded-lg p-5 hover:shadow-[0_8px_24px_-8px_rgba(184,134,11,0.35)] hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] bg-[#B8860B]/10 px-2 py-0.5 rounded-full">
          {vendor.category}
        </span>
        <RatingBadge rating={vendor.rating} reviews={vendor.reviews} />
      </div>

      <h3 className="font-serif text-lg text-[#3A2E1F] leading-snug mb-1">{vendor.name}</h3>
      <p className="text-xs text-[#8a7355] mb-3">{vendor.tag}</p>

      <div className="flex items-center justify-between text-sm mb-3">
        <span className="flex items-center gap-1 text-[#6b5940]">
          <MapPin className="w-3.5 h-3.5" />{vendor.city}
        </span>
        <span className="flex items-center font-serif text-lg text-[#8B4513]">
          {vendor.price.includes("₹") ? vendor.price : `₹${vendor.price}`}
        </span>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 bg-[#8B4513] text-[#FBF6EC] text-sm font-medium py-2 rounded-md hover:bg-[#6b350f] transition-colors flex items-center justify-center gap-1.5">
          <Phone className="w-3.5 h-3.5" /> Call to Book
        </button>
      </div>
    </div>
  );
}

function ListVendorModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", category: "Caterers", city: "", price: "", tag: "", phone: "" });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name || !form.city || !form.phone) return;
    onAdd({ ...form, id: Date.now(), rating: 5.0, reviews: 0 });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#3A2E1F]/60 flex items-center justify-center p-4 z-50">
      <div className="bg-[#FBF6EC] max-w-md w-full rounded-lg border border-[#E2D2A8] p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#8a7355] hover:text-[#8B4513]">
          <X className="w-5 h-5" />
        </button>
        <h2 className="font-serif text-2xl text-[#3A2E1F] mb-1">List your service</h2>
        <p className="text-sm text-[#8a7355] mb-5">Get booked by families planning their next function.</p>

        <div className="space-y-3">
          <input placeholder="Business name" value={form.name} onChange={(e) => update("name", e.target.value)}
            className="w-full bg-white border border-[#E2D2A8] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]" />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.category} onChange={(e) => update("category", e.target.value)}
              className="bg-white border border-[#E2D2A8] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]">
              {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
            </select>
            <input placeholder="City" value={form.city} onChange={(e) => update("city", e.target.value)}
              className="bg-white border border-[#E2D2A8] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]" />
          </div>
          <input placeholder="Starting price (e.g. ₹300/plate)" value={form.price} onChange={(e) => update("price", e.target.value)}
            className="w-full bg-white border border-[#E2D2A8] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]" />
          <input placeholder="What makes you special (e.g. Pure Veg)" value={form.tag} onChange={(e) => update("tag", e.target.value)}
            className="w-full bg-white border border-[#E2D2A8] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]" />
          <input placeholder="Contact number" value={form.phone} onChange={(e) => update("phone", e.target.value)}
            className="w-full bg-white border border-[#E2D2A8] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]" />
        </div>

        <button onClick={submit} className="w-full mt-5 bg-[#8B4513] text-[#FBF6EC] font-medium py-2.5 rounded-md hover:bg-[#6b350f] transition-colors">
          Add my listing
        </button>
      </div>
    </div>
  );
}

export default function FunctionMandi() {
  const [vendors, setVendors] = useState(SEED_VENDORS);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("All Cities");
  const [showList, setShowList] = useState(false);

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      const matchesQuery = (v.name + v.city).toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || v.category === category;
      const matchesCity = city === "All Cities" || v.city === city;
      return matchesQuery && matchesCategory && matchesCity;
    });
  }, [vendors, query, category, city]);

  return (
    <div className="min-h-screen bg-[#F4EDDC] font-sans">
      <header className="border-b border-[#E2D2A8] bg-[#FBF6EC]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PartyPopper className="w-6 h-6 text-[#8B4513]" strokeWidth={2} />
            <span className="font-serif text-xl text-[#3A2E1F] tracking-tight">FunctionMandi</span>
          </div>
          <button onClick={() => setShowList(true)}
            className="flex items-center gap-1.5 bg-[#8B4513] text-[#FBF6EC] text-sm font-medium px-4 py-2 rounded-md hover:bg-[#6b350f] transition-colors">
            <Plus className="w-4 h-4" /> List your service
          </button>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-1.5 border border-[#B8860B] text-[#B8860B] text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full mb-5">
          <Calendar className="w-3.5 h-3.5" /> Every Function, One Search
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-[#3A2E1F] leading-tight mb-4">
          Caterers, decorators, photographers —<br />booked in one call.
        </h1>
        <p className="text-[#6b5940] max-w-md mx-auto mb-8">
          Find trusted local vendors for weddings, birthdays and functions — with real ratings from your city.
        </p>

        <div className="max-w-lg mx-auto flex gap-2">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#a1815c]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by vendor name…"
              className="w-full bg-white border border-[#E2D2A8] rounded-md pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]"
            />
          </div>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#a1815c] pointer-events-none" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-white border border-[#E2D2A8] rounded-md pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B] appearance-none"
            >
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <p className="text-xs text-[#a1815c] mt-3">{CITIES.length - 1}+ cities listed — and any vendor, in any town, can join by searching their city below.</p>
      </section>

      <div className="max-w-5xl mx-auto px-6 flex flex-wrap gap-2 justify-center mb-8">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCategory(c)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              category === c ? "bg-[#8B4513] text-[#FBF6EC] border-[#8B4513]" : "bg-transparent text-[#6b5940] border-[#E2D2A8] hover:border-[#B8860B]"
            }`}>
            {c}
          </button>
        ))}
      </div>

      <main className="max-w-5xl mx-auto px-6 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <PartyPopper className="w-10 h-10 text-[#E2D2A8] mx-auto mb-3" />
            <p className="text-[#8a7355]">No vendors match that search yet — try another city, or list your own service.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((vendor) => <VendorCard key={vendor.id} vendor={vendor} />)}
          </div>
        )}
      </main>

      <footer className="border-t border-[#E2D2A8] py-6 text-center text-xs text-[#a1815c]">
        FunctionMandi — every good function starts with the right team.
      </footer>

      {showList && <ListVendorModal onClose={() => setShowList(false)} onAdd={(v) => setVendors((prev) => [v, ...prev])} />}
    </div>
  );
}
