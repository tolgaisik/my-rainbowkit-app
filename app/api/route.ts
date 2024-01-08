import type { NextApiRequest, NextApiResponse } from 'next'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

type ResponseData = {
  message: string
}

export function GET(req: any, res: any) {
  revalidatePath("collections/[collection_id]");
  return NextResponse.json({ message: 'Hello World' })
}
