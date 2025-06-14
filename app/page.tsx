'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Github, ArrowRight, Sparkles, Orbit, Zap, Users } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen">
        {/* Left Side - App Introduction */}
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="max-w-lg space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Orbit className="w-8 h-8 text-black" />
                <h1 className="text-3xl font-bold text-black">Solar System Builder</h1>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Create, customize, and simulate your own solar systems with realistic physics and orbital mechanics.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-black mt-1" />
                <div>
                  <h3 className="font-semibold text-black">Interactive Design</h3>
                  <p className="text-sm text-gray-600">Drag and drop planets, customize orbits, and watch your system come to life</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-black mt-1" />
                <div>
                  <h3 className="font-semibold text-black">Real Physics</h3>
                  <p className="text-sm text-gray-600">Experience authentic orbital mechanics and gravitational interactions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-black mt-1" />
                <div>
                  <h3 className="font-semibold text-black">Share & Explore</h3>
                  <p className="text-sm text-gray-600">Save your creations and explore systems built by others</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Action Buttons */}
        <div className="flex-1 flex items-center justify-center p-12 bg-gray-50">
          <Card className="w-full max-w-md p-8 space-y-6 border-0 shadow-lg">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-black">Get Started</h2>
              <p className="text-gray-600">Begin building your solar system</p>
            </div>

            <div className="space-y-4">
              <Link href="/builder" className="block">
                <Button className="w-full h-12 bg-black hover:bg-gray-800 text-white">
                  Try App
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Button 
                variant="outline" 
                className="w-full h-12 border-gray-300 hover:bg-gray-50"
                asChild
              >
                <a href="https://github.com/DivyanshTiwari20/solar-system-simulation.git" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </a>
              </Button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                No account required • Free to use • Open source
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}