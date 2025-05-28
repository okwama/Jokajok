
import React from 'react';
import { Shield, Droplets, Sun, Wind, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CareInstructions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-soft-sand mb-4">Care Instructions</h1>
          <p className="text-xl text-copper-wood-400">
            Preserve the beauty and longevity of your JokaJok pieces with proper care
          </p>
        </div>

        <Card className="bg-dark-clay-100 border-copper-wood-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-soft-sand font-serif">
              <Heart className="h-6 w-6 text-burnished-copper-500 mr-3" />
              Why Proper Care Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="text-copper-wood-400">
            <p className="text-lg leading-relaxed">
              Each JokaJok piece is handcrafted using traditional techniques and premium materials. 
              With proper care, your items will develop a beautiful patina over time while maintaining 
              their structural integrity and aesthetic appeal for generations to come.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-dark-clay-100 border-copper-wood-700">
            <CardHeader>
              <CardTitle className="flex items-center text-soft-sand font-serif">
                <Shield className="h-6 w-6 text-burnished-copper-500 mr-3" />
                Leather Care
              </CardTitle>
            </CardHeader>
            <CardContent className="text-copper-wood-400 space-y-4">
              <div>
                <h4 className="font-semibold text-soft-sand mb-2">Daily Care</h4>
                <ul className="space-y-1">
                  <li>• Gently wipe with a soft, dry cloth after each use</li>
                  <li>• Remove dirt and debris immediately</li>
                  <li>• Allow to air dry naturally if exposed to moisture</li>
                  <li>• Avoid overloading to prevent stretching</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-soft-sand mb-2">Weekly Maintenance</h4>
                <ul className="space-y-1">
                  <li>• Use a leather brush to remove surface dirt</li>
                  <li>• Apply leather conditioner monthly</li>
                  <li>• Check for loose stitching or hardware</li>
                  <li>• Rotate items to prevent uneven wear</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-soft-sand mb-2">Deep Cleaning</h4>
                <ul className="space-y-1">
                  <li>• Use specialized leather cleaner for stains</li>
                  <li>• Test cleaning products on hidden areas first</li>
                  <li>• Professional cleaning for valuable pieces</li>
                  <li>• Allow 24-48 hours drying time</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-clay-100 border-copper-wood-700">
            <CardHeader>
              <CardTitle className="flex items-center text-soft-sand font-serif">
                <Droplets className="h-6 w-6 text-burnished-copper-500 mr-3" />
                Beadwork & Textiles
              </CardTitle>
            </CardHeader>
            <CardContent className="text-copper-wood-400 space-y-4">
              <div>
                <h4 className="font-semibold text-soft-sand mb-2">Gentle Handling</h4>
                <ul className="space-y-1">
                  <li>• Handle by the base, not the beadwork</li>
                  <li>• Store flat or hanging to prevent stress</li>
                  <li>• Avoid catching on rough surfaces</li>
                  <li>• Keep away from sharp objects</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-soft-sand mb-2">Cleaning</h4>
                <ul className="space-y-1">
                  <li>• Spot clean with damp cloth only</li>
                  <li>• Use mild soap for stubborn stains</li>
                  <li>• Never submerge in water</li>
                  <li>• Air dry away from direct heat</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-soft-sand mb-2">Repair</h4>
                <ul className="space-y-1">
                  <li>• Contact us for professional repair services</li>
                  <li>• Don't attempt to re-string beads yourself</li>
                  <li>• Save any loose beads or components</li>
                  <li>• Regular inspections prevent major damage</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-dark-clay-100 border-copper-wood-700">
            <CardHeader>
              <CardTitle className="flex items-center text-soft-sand font-serif">
                <Sun className="h-6 w-6 text-burnished-copper-500 mr-3" />
                Sun Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="text-copper-wood-400 space-y-3">
              <p className="font-semibold text-soft-sand">Avoid Direct Sunlight</p>
              <ul className="space-y-1 text-sm">
                <li>• Store away from windows</li>
                <li>• UV rays can fade colors</li>
                <li>• Can cause leather to crack</li>
                <li>• Use dust bags for storage</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-dark-clay-100 border-copper-wood-700">
            <CardHeader>
              <CardTitle className="flex items-center text-soft-sand font-serif">
                <Droplets className="h-6 w-6 text-burnished-copper-500 mr-3" />
                Moisture Control
              </CardTitle>
            </CardHeader>
            <CardContent className="text-copper-wood-400 space-y-3">
              <p className="font-semibold text-soft-sand">Keep Dry</p>
              <ul className="space-y-1 text-sm">
                <li>• Use silica gel packets</li>
                <li>• Avoid humid environments</li>
                <li>• Never store when damp</li>
                <li>• Allow air circulation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-dark-clay-100 border-copper-wood-700">
            <CardHeader>
              <CardTitle className="flex items-center text-soft-sand font-serif">
                <Wind className="h-6 w-6 text-burnished-copper-500 mr-3" />
                Temperature
              </CardTitle>
            </CardHeader>
            <CardContent className="text-copper-wood-400 space-y-3">
              <p className="font-semibold text-soft-sand">Stable Environment</p>
              <ul className="space-y-1 text-sm">
                <li>• Room temperature storage</li>
                <li>• Avoid extreme heat/cold</li>
                <li>• No storage in cars</li>
                <li>• Gradual temperature changes</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-dark-clay-100 border-copper-wood-700 mb-8">
          <CardHeader>
            <CardTitle className="text-soft-sand font-serif">Storage Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="text-copper-wood-400">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-soft-sand mb-4">Short-term Storage (Daily/Weekly)</h4>
                <div className="space-y-3">
                  <div>
                    <strong className="text-burnished-copper-400">Bags:</strong>
                    <p>Stuff with tissue paper to maintain shape, store upright or hanging</p>
                  </div>
                  <div>
                    <strong className="text-burnished-copper-400">Jewelry:</strong>
                    <p>Keep in individual pouches or compartments to prevent scratching</p>
                  </div>
                  <div>
                    <strong className="text-burnished-copper-400">Accessories:</strong>
                    <p>Lay flat or hang to prevent creasing and deformation</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-soft-sand mb-4">Long-term Storage (Seasonal)</h4>
                <div className="space-y-3">
                  <div>
                    <strong className="text-burnished-copper-400">Preparation:</strong>
                    <p>Clean thoroughly, condition leather, ensure completely dry</p>
                  </div>
                  <div>
                    <strong className="text-burnished-copper-400">Environment:</strong>
                    <p>Cool, dry place with stable temperature and good air circulation</p>
                  </div>
                  <div>
                    <strong className="text-burnished-copper-400">Protection:</strong>
                    <p>Use breathable dust bags, never plastic bags that trap moisture</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-clay-100 border-copper-wood-700 mb-8">
          <CardHeader>
            <CardTitle className="text-soft-sand font-serif">Common Issues & Solutions</CardTitle>
          </CardHeader>
          <CardContent className="text-copper-wood-400">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-soft-sand mb-2">Water Stains</h4>
                  <p className="text-sm">Blot immediately, allow to air dry, then condition the leather. For severe stains, consult a professional.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-soft-sand mb-2">Scratches</h4>
                  <p className="text-sm">Minor scratches often disappear with leather conditioner. Deep scratches may require professional repair.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-soft-sand mb-2">Fading</h4>
                  <p className="text-sm">Gradual fading is natural and adds character. Prevent with proper storage away from sunlight.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-soft-sand mb-2">Loose Beads</h4>
                  <p className="text-sm">Save loose beads and contact us for repair. Don't continue using if beadwork is compromised.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-soft-sand mb-2">Hardware Issues</h4>
                  <p className="text-sm">Tarnished or loose hardware can often be repaired or replaced. Contact our repair service.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-soft-sand mb-2">Shape Loss</h4>
                  <p className="text-sm">Restructure with appropriate stuffing and allow to rest. Severe cases may need professional restoration.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-clay-100 border-copper-wood-700">
          <CardHeader>
            <CardTitle className="text-soft-sand font-serif">Professional Services</CardTitle>
          </CardHeader>
          <CardContent className="text-copper-wood-400">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-soft-sand mb-3">Repair Services</h4>
                <p className="mb-3">Our skilled artisans offer comprehensive repair services to restore your JokaJok pieces to their original beauty.</p>
                <ul className="space-y-1 text-sm">
                  <li>• Re-beading and re-stringing</li>
                  <li>• Leather restoration</li>
                  <li>• Hardware replacement</li>
                  <li>• Structural repairs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-soft-sand mb-3">Maintenance Services</h4>
                <p className="mb-3">Regular professional maintenance keeps your items in pristine condition.</p>
                <ul className="space-y-1 text-sm">
                  <li>• Deep cleaning and conditioning</li>
                  <li>• Protective treatments</li>
                  <li>• Quality assessments</li>
                  <li>• Preventive care recommendations</li>
                </ul>
              </div>
            </div>
            <div className="bg-burnished-copper-500/10 border border-burnished-copper-500/30 rounded-lg p-4 mt-6">
              <p className="text-burnished-copper-400 font-medium text-center">
                For repair services or care questions, contact us at care@jokajok.com or +254 700 123 456. 
                We're committed to helping you preserve your treasured pieces for years to come.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareInstructions;
