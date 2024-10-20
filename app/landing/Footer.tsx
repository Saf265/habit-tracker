'use client'

import React from 'react'
import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/">
            <h1 className="text-xl font-bold">EverHabit</h1>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Science-based habit tracker. Built with love by{' '}
            <a
              href="https://github.com/Saf265"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Safwan
            </a>
            .
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/Saf265" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://x.com/Safwan1978774" target="_blank" rel="noreferrer">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}