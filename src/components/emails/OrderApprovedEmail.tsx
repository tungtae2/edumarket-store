import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface OrderApprovedEmailProps {
  customerName: string;
  orderId: string;
  downloadLink: string;
}

export const OrderApprovedEmail = ({
  customerName,
  orderId,
  downloadLink,
}: OrderApprovedEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>ใบงานที่คุณสั่งซื้อพร้อมให้ดาวน์โหลดแล้ว!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>🎉 คำสั่งซื้อของคุณได้รับการอนุมัติแล้ว!</Heading>
          </Section>
          
          <Section style={content}>
            <Text style={paragraph}>สวัสดีคุณ {customerName},</Text>
            <Text style={paragraph}>
              ขอบคุณที่สนับสนุนเว็บไซต์ของเรา! ยอดเงินของคุณสำหรับคำสั่งซื้อ <strong>#{orderId}</strong> ได้รับการตรวจสอบเรียบร้อยแล้ว
            </Text>
            
            <Section style={buttonContainer}>
              <Link href={downloadLink} style={button}>
                คลิกที่นี่เพื่อดาวน์โหลดไฟล์ใบงาน
              </Link>
            </Section>

            <Text style={paragraph}>
              หากมีคำถามหรือพบปัญหาในการดาวน์โหลด สามารถตอบกลับอีเมลฉบับนี้ได้เลยครับ
            </Text>
            <Text style={signoff}>
              ด้วยรักและห่วงใย,<br />
              ทีมงาน Edumarket
            </Text>
          </Section>
          
          <Section style={footer}>
            <Text style={footerText}>
              © 2026 Edumarket. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f8fafc',
  fontFamily: '"Kanit", "Prompt", "Helvetica Neue", Helvetica, Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
  maxWidth: '100%',
};

const header = {
  backgroundColor: '#fce7f3', // Sakura pink vibe
  padding: '24px',
  borderRadius: '12px 12px 0 0',
  border: '2px solid #1e293b',
  borderBottom: 'none',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#db2777',
  fontSize: '24px',
  margin: '0',
  fontWeight: 'bold',
};

const content = {
  backgroundColor: '#ffffff',
  padding: '32px 24px',
  borderRadius: '0 0 12px 12px',
  border: '2px solid #1e293b',
  borderTop: 'none',
  boxShadow: '4px 4px 0px #1e293b',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#334155',
  marginBottom: '16px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#4f46e5',
  borderRadius: '12px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
  fontWeight: 'bold',
  border: '2px solid #1e293b',
  boxShadow: '4px 4px 0px #1e293b',
};

const signoff = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#64748b',
  marginTop: '32px',
};

const footer = {
  textAlign: 'center' as const,
  marginTop: '24px',
};

const footerText = {
  fontSize: '14px',
  color: '#94a3b8',
};

export default OrderApprovedEmail;
