import { Star, Heart, ShoppingCart, Check, Zap, Shield, Users, ArrowRight, MapPin, Link2, Twitter } from 'lucide-react'
import { useState } from 'react'

/* ─────────────── Product Card ─────────────── */
export function ProductCard({ name, category, price, rating, reviews, badge, color }: {
  name: string; category: string; price: number; rating: number; reviews: number; badge?: string; color: string
}) {
  const [liked, setLiked] = useState(false)
  const [inCart, setInCart] = useState(false)

  return (
    <div className="clay-card overflow-hidden group cursor-default hover:-translate-y-1 hover:shadow-clay-lg transition-all duration-200">
      <div className="relative h-44 flex items-center justify-center" style={{ background: color }}>
        {badge && (
          <span className="absolute top-3 left-3 text-xs font-bold bg-white/90 px-2.5 py-1 rounded-full shadow-soft text-slate-700">{badge}</span>
        )}
        <button
          onClick={() => setLiked(l => !l)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-soft cursor-pointer transition-transform hover:scale-110 active:scale-95"
          aria-label="Like"
        >
          <Heart className={`w-4 h-4 transition-colors ${liked ? 'fill-red-400 text-red-400' : 'text-slate-400'}`} />
        </button>
        <div className="w-20 h-20 bg-white/30 rounded-2xl backdrop-blur-sm flex items-center justify-center shadow-clay">
          <Zap className="w-10 h-10 text-white" />
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-slate-400 font-medium">{category}</p>
        <h4 className="font-heading font-bold text-slate-800 mt-0.5">{name}</h4>
        <div className="flex items-center gap-1 mt-1.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
          ))}
          <span className="text-xs text-slate-400 ml-1">({reviews})</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-heading font-bold text-slate-800">${price}</span>
          <button
            onClick={() => setInCart(c => !c)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 ${inCart ? 'bg-emerald-100 text-emerald-600' : 'bg-sky-500 text-white shadow-clay hover:bg-sky-600'}`}
          >
            {inCart ? <><Check className="w-3.5 h-3.5" />Added</> : <><ShoppingCart className="w-3.5 h-3.5" />Add</>}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── Profile Card ─────────────── */
export function ProfileCard({ name, role, location, followers, following, posts, avatar }: {
  name: string; role: string; location: string; followers: number; following: number; posts: number; avatar: string
}) {
  const [followed, setFollowed] = useState(false)

  return (
    <div className="clay-card overflow-hidden hover:-translate-y-0.5 hover:shadow-clay-lg transition-all duration-200 cursor-default">
      <div className="h-20 bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400" />
      <div className="px-5 pb-5">
        <div className="flex items-end justify-between -mt-8 mb-3">
          <div className="w-16 h-16 rounded-2xl border-4 border-white shadow-clay flex items-center justify-center text-2xl font-bold text-white"
            style={{ background: avatar }}>
            {name[0]}
          </div>
          <div className="flex gap-2 pt-10">
            <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:border-sky-300 hover:text-sky-500 cursor-pointer transition-all shadow-soft">
              <Link2 className="w-3.5 h-3.5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:border-sky-400 hover:text-sky-400 cursor-pointer transition-all shadow-soft">
              <Twitter className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setFollowed(f => !f)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl cursor-pointer transition-all duration-200 ${followed ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-sky-500 text-white shadow-clay hover:bg-sky-600'}`}
            >
              {followed ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>
        <h4 className="font-heading font-bold text-slate-800">{name}</h4>
        <p className="text-sm text-slate-400">{role}</p>
        <div className="flex items-center gap-1 mt-1 text-xs text-slate-400">
          <MapPin className="w-3 h-3" />{location}
        </div>
        <div className="mt-4 flex divide-x divide-slate-100">
          {[['Posts', posts], ['Followers', followers], ['Following', following]].map(([l, v]) => (
            <div key={l as string} className="flex-1 text-center">
              <p className="font-heading font-bold text-slate-800 text-sm">{typeof v === 'number' ? v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v : v}</p>
              <p className="text-xs text-slate-400">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────── Pricing Card ─────────────── */
export function PricingCard({ plan, price, period, description, features, cta, highlight, color }: {
  plan: string; price: number; period: string; description: string; features: string[]; cta: string; highlight?: boolean; color: string
}) {
  return (
    <div className={`rounded-clay-lg border p-6 flex flex-col gap-5 transition-all duration-200 hover:-translate-y-1 cursor-default ${highlight ? 'border-sky-200 shadow-clay-lg' : 'bg-white border-slate-100 shadow-clay'}`}
      style={highlight ? { background: `linear-gradient(135deg, ${color}15, ${color}05)`, borderColor: `${color}40` } : {}}>
      {highlight && (
        <div className="self-start text-xs font-bold px-3 py-1 rounded-full text-white shadow-clay" style={{ background: color }}>Most Popular</div>
      )}
      <div>
        <h4 className="font-heading font-bold text-slate-800 text-lg">{plan}</h4>
        <p className="text-xs text-slate-400 mt-0.5">{description}</p>
      </div>
      <div className="flex items-end gap-1">
        <span className="text-4xl font-heading font-bold text-slate-800">${price}</span>
        <span className="text-slate-400 text-sm mb-1">/{period}</span>
      </div>
      <ul className="space-y-2.5 flex-1">
        {features.map(f => (
          <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
            <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color }} />
            {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-xl font-bold text-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${highlight ? 'text-white shadow-clay hover:shadow-clay-lg' : 'border border-slate-200 text-slate-700 hover:border-sky-200 hover:text-sky-600 bg-white'}`}
        style={highlight ? { background: color } : {}}>
        {cta}
      </button>
    </div>
  )
}

/* ─────────────── Testimonial Card ─────────────── */
export function TestimonialCard({ quote, author, role, rating, color }: { quote: string; author: string; role: string; rating: number; color: string }) {
  return (
    <div className="clay-card p-5 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-clay-lg transition-all duration-200 cursor-default">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
        ))}
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">"{quote}"</p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: color }}>
          {author[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">{author}</p>
          <p className="text-xs text-slate-400">{role}</p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── Showcase ─────────────── */
export function CardsShowcase() {
  return (
    <div className="space-y-12">

      {/* Product Cards */}
      <div>
        <p className="section-label">Product Cards</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <ProductCard name="Aurora Pro"   category="Software" price={49}  rating={4.8} reviews={312} badge="New"  color="linear-gradient(135deg,#bae6fd,#ddd6fe)" />
          <ProductCard name="Bolt Engine"  category="Hardware" price={129} rating={4.5} reviews={87}  badge="Sale" color="linear-gradient(135deg,#d1fae5,#a7f3d0)" />
          <ProductCard name="Prism Kit"    category="Design"   price={29}  rating={5.0} reviews={220}             color="linear-gradient(135deg,#fce7f3,#fef9c3)" />
          <ProductCard name="Flux Studio"  category="App"      price={79}  rating={4.2} reviews={54}              color="linear-gradient(135deg,#ede9fe,#fce7f3)" />
        </div>
      </div>

      {/* Profile Cards */}
      <div>
        <p className="section-label">Profile Cards</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ProfileCard name="Sophie Lambert" role="Product Designer"   location="Paris, France"    followers={8200}  following={340} posts={128} avatar="linear-gradient(135deg,#38bdf8,#818cf8)" />
          <ProfileCard name="Marcus Chen"    role="Full-stack Dev"     location="Singapore"        followers={14500} following={210} posts={94}  avatar="linear-gradient(135deg,#34d399,#0ea5e9)" />
          <ProfileCard name="Anya Patel"     role="Data Scientist"     location="London, UK"       followers={3100}  following={890} posts={47}  avatar="linear-gradient(135deg,#f472b6,#fb923c)" />
        </div>
      </div>

      {/* Pricing Cards */}
      <div>
        <p className="section-label">Pricing Cards</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <PricingCard
            plan="Starter" price={0} period="mo" cta="Get started free"
            description="Everything you need to get going."
            features={['Up to 3 projects', '5 GB storage', 'Basic analytics', 'Community support']}
            color="#0ea5e9"
          />
          <PricingCard
            plan="Pro" price={29} period="mo" cta="Start free trial" highlight
            description="For teams that need more power."
            features={['Unlimited projects', '50 GB storage', 'Advanced analytics', 'Priority support', 'Custom domains', 'Team collaboration']}
            color="#0ea5e9"
          />
          <PricingCard
            plan="Enterprise" price={99} period="mo" cta="Contact sales"
            description="For organisations at scale."
            features={['Everything in Pro', 'Unlimited storage', 'SSO & SAML', 'SLA guarantee', 'Dedicated success manager']}
            color="#8b5cf6"
          />
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <p className="section-label">Testimonials</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TestimonialCard rating={5} color="#0ea5e9" author="Sophie L."  role="Head of Design @ Notion"
            quote="The Clay UI components are the most polished I've ever used. The attention to detail in every shadow and radius is incredible." />
          <TestimonialCard rating={5} color="#8b5cf6" author="Marcus C."  role="CTO @ Linear"
            quote="We rebuilt our entire dashboard using these components. Build time dropped by 60% and the result looks stunning." />
          <TestimonialCard rating={4} color="#f472b6" author="Anya P."    role="Designer @ Figma"
            quote="Beautifully crafted. The minimal-claymorphism blend is exactly the design language I've been searching for." />
        </div>
      </div>

    </div>
  )
}
