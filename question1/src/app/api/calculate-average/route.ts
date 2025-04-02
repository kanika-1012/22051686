// question1/src/app/api/calculate-average/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { numbers } = body;
    
    // Validate input
    if (!numbers || !Array.isArray(numbers)) {
      return NextResponse.json(
        { error: 'Please provide an array of numbers' }, 
        { status: 400 }
      );
    }
    
    // Filter out non-numbers
    const validNumbers = numbers.filter(num => typeof num === 'number' && !isNaN(num));
    
    if (validNumbers.length === 0) {
      return NextResponse.json(
        { error: 'No valid numbers provided' }, 
        { status: 400 }
      );
    }
    
    // Calculate average
    const sum = validNumbers.reduce((acc: number, curr: number) => acc + curr, 0);
    const average = sum / validNumbers.length;
    
    return NextResponse.json({ average });
  } catch (error) {
    console.error('Error calculating average:', error);
    return NextResponse.json(
      { error: 'Failed to calculate average' }, 
      { status: 500 }
    );
  }
}