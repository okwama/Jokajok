
import React from 'react';
import { Ruler, Info, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SizeGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-charred-wood via-dark-clay-100 to-swahili-dust-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-soft-sand mb-4">Size Guide</h1>
          <p className="text-xl text-copper-wood-400">
            Find your perfect fit with our comprehensive sizing information
          </p>
        </div>

        <Card className="bg-dark-clay-100 border-copper-wood-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-soft-sand font-serif">
              <Ruler className="h-6 w-6 text-burnished-copper-500 mr-3" />
              How to Measure
            </CardTitle>
          </CardHeader>
          <CardContent className="text-copper-wood-400">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-soft-sand mb-4">For Bags & Accessories</h4>
                <div className="space-y-3">
                  <div>
                    <strong className="text-burnished-copper-400">Length:</strong> Measure from one end to the other at the longest point
                  </div>
                  <div>
                    <strong className="text-burnished-copper-400">Width:</strong> Measure across the widest part
                  </div>
                  <div>
                    <strong className="text-burnished-copper-400">Height/Depth:</strong> Measure from bottom to top when standing upright
                  </div>
                  <div>
                    <strong className="text-burnished-copper-400">Strap Drop:</strong> Measure from top of bag to bottom of strap when extended
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-soft-sand mb-4">For Jewelry</h4>
                <div className="space-y-3">
                  <div>
                    <strong className="text-burnished-copper-400">Necklace Length:</strong> Measure from clasp to clasp when laid flat
                  </div>
                  <div>
                    <strong className="text-burnished-copper-400">Bracelet Size:</strong> Measure your wrist circumference and add 1-2cm for comfort
                  </div>
                  <div>
                    <strong className="text-burnished-copper-400">Ring Size:</strong> Measure the inside diameter of a ring that fits well
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-dark-clay-100 border-copper-wood-700">
            <CardHeader>
              <CardTitle className="text-soft-sand font-serif">Bag Sizes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-copper-wood-400">
                  <thead>
                    <tr className="border-b border-copper-wood-600">
                      <th className="text-left py-2 text-soft-sand">Size</th>
                      <th className="text-left py-2 text-soft-sand">Length (cm)</th>
                      <th className="text-left py-2 text-soft-sand">Width (cm)</th>
                      <th className="text-left py-2 text-soft-sand">Height (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-copper-wood-700">
                    <tr>
                      <td className="py-2 font-medium">Small</td>
                      <td className="py-2">20-25</td>
                      <td className="py-2">15-20</td>
                      <td className="py-2">10-15</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Medium</td>
                      <td className="py-2">25-35</td>
                      <td className="py-2">20-30</td>
                      <td className="py-2">15-25</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Large</td>
                      <td className="py-2">35-45</td>
                      <td className="py-2">30-40</td>
                      <td className="py-2">25-35</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Extra Large</td>
                      <td className="py-2">45+</td>
                      <td className="py-2">40+</td>
                      <td className="py-2">35+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dark-clay-100 border-copper-wood-700">
            <CardHeader>
              <CardTitle className="text-soft-sand font-serif">Jewelry Sizes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-soft-sand mb-3">Necklace Lengths</h4>
                  <div className="space-y-2 text-copper-wood-400">
                    <div className="flex justify-between">
                      <span>Choker</span>
                      <span>35-40 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Princess</span>
                      <span>40-45 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Matinee</span>
                      <span>50-60 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Opera</span>
                      <span>70-85 cm</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-soft-sand mb-3">Bracelet Sizes</h4>
                  <div className="space-y-2 text-copper-wood-400">
                    <div className="flex justify-between">
                      <span>Small</span>
                      <span>16-17 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medium</span>
                      <span>17-19 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Large</span>
                      <span>19-21 cm</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-dark-clay-100 border-copper-wood-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-soft-sand font-serif">
              <Users className="h-6 w-6 text-burnished-copper-500 mr-3" />
              Size Recommendations by Use
            </CardTitle>
          </CardHeader>
          <CardContent className="text-copper-wood-400">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-soft-sand mb-3">Daily Use</h4>
                <ul className="space-y-1">
                  <li>• Small to Medium bags</li>
                  <li>• Crossbody or shoulder bags</li>
                  <li>• Comfortable strap length</li>
                  <li>• Easy access pockets</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-soft-sand mb-3">Travel</h4>
                <ul className="space-y-1">
                  <li>• Large to Extra Large</li>
                  <li>• Durable materials</li>
                  <li>• Multiple compartments</li>
                  <li>• Secure closures</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-soft-sand mb-3">Formal Events</h4>
                <ul className="space-y-1">
                  <li>• Small clutches or purses</li>
                  <li>• Elegant jewelry pieces</li>
                  <li>• Statement accessories</li>
                  <li>• Classic designs</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-clay-100 border-copper-wood-700">
          <CardHeader>
            <CardTitle className="flex items-center text-soft-sand font-serif">
              <Info className="h-6 w-6 text-burnished-copper-500 mr-3" />
              Sizing Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="text-copper-wood-400 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-soft-sand mb-2">General Guidelines</h4>
                <ul className="space-y-1">
                  <li>• All measurements are approximate and may vary slightly</li>
                  <li>• Leather items may stretch slightly with use</li>
                  <li>• When in doubt, contact our customer service team</li>
                  <li>• Consider your intended use when selecting size</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-soft-sand mb-2">Care Considerations</h4>
                <ul className="space-y-1">
                  <li>• Leather may soften and conform over time</li>
                  <li>• Avoid overpacking to maintain shape</li>
                  <li>• Store items properly to prevent deformation</li>
                  <li>• Regular conditioning helps maintain size</li>
                </ul>
              </div>
            </div>
            <div className="bg-burnished-copper-500/10 border border-burnished-copper-500/30 rounded-lg p-4 mt-6">
              <p className="text-burnished-copper-400 font-medium">
                Still unsure about sizing? Our expert craftspeople are happy to help you find the perfect fit. 
                Contact us at hello@jokajok.com or +254 700 123 456 for personalized sizing assistance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SizeGuide;
