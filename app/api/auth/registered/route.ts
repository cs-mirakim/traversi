import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "registered-users.json");

// Default registered emails - ONLY pre-registered demo account
const DEFAULT_EMAILS = ["hangtuah@traversi.my"];

function getRegisteredList(): string[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_EMAILS, null, 2), "utf-8");
      return DEFAULT_EMAILS;
    }
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return Array.from(new Set([...DEFAULT_EMAILS, ...parsed.map((e: string) => e.toLowerCase().trim())]));
    }
    return DEFAULT_EMAILS;
  } catch (err) {
    console.warn("Failed to read registered-users.json, using defaults:", err);
    return DEFAULT_EMAILS;
  }
}

function saveRegisteredList(list: string[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const cleanList = Array.from(new Set(list.map((e) => e.toLowerCase().trim())));
    fs.writeFileSync(DATA_FILE, JSON.stringify(cleanList, null, 2), "utf-8");
  } catch (err) {
    console.warn("Failed to save registered-users.json:", err);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.toLowerCase().trim();

  const list = getRegisteredList();

  if (!email) {
    return NextResponse.json({ count: list.length, emails: list });
  }

  const isRegistered = list.includes(email);
  return NextResponse.json({ email, isRegistered });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, action } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const cleanEmail = String(email).toLowerCase().trim();
    const list = getRegisteredList();

    if (action === "unregister") {
      // Remove email from registry
      const updated = list.filter((e) => e !== cleanEmail);
      saveRegisteredList(updated);
      return NextResponse.json({ success: true, action: "unregistered", email: cleanEmail });
    } else {
      // Register email
      if (!list.includes(cleanEmail)) {
        list.push(cleanEmail);
        saveRegisteredList(list);
      }
      return NextResponse.json({ success: true, action: "registered", email: cleanEmail });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Internal error" }, { status: 500 });
  }
}
