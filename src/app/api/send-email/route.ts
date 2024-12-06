import { NextRequest, NextResponse } from 'next/server';
import checkAndSendNotifications from '@/lib/utils/notificationLogic';

export async function GET(req: NextRequest) {
  try {
    await checkAndSendNotifications();
    return NextResponse.json({ message: 'Notifications sent successfully' });
  } catch (error) {
    console.error('Error in /api/send-email:', error);
    return NextResponse.json({ error: 'Failed to send notifications' }, { status: 500 });
  }
}
