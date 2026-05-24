#!/usr/bin/env python3
import pandas as pd
import os
from datetime import datetime
from supabase import create_client, Client
import sys

# Supabase 초기화
SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
SUPABASE_KEY = os.getenv('VITE_SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: 환경 변수 VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY가 필요합니다")
    sys.exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# 엑셀 파일 읽기
EXCEL_FILE = r'C:\Users\lmh40\OneDrive\바탕 화면\how to win trading 엑셀버전.xlsx'

try:
    df = pd.read_excel(EXCEL_FILE, sheet_name=4)  # 차트 모음 종베 (4번째 시트)

    # 컬럼 매핑
    df.columns = ['date', 'company', 'signal_detail', 'target_price', 'profit_loss',
                  'entry_time', 'first_action', 'second_action', 'query_notes']

    # 빈 행 제거
    df = df.dropna(subset=['company'])

    # 날짜 형식 변환 (예: 25.08.29 → 2025-08-29)
    def convert_date(date_str):
        if pd.isna(date_str):
            return None
        try:
            parts = str(date_str).split('.')
            if len(parts) == 3:
                year = int('20' + parts[0])
                month = int(parts[1])
                day = int(parts[2])
                return f"{year:04d}-{month:02d}-{day:02d}"
        except:
            pass
        return None

    df['date'] = df['date'].apply(convert_date)

    # 수익 데이터 정리
    df['profit_loss'] = pd.to_numeric(df['profit_loss'], errors='coerce')
    df['investment'] = 100000000  # 1억

    # 수익률 계산
    df['profit_percentage'] = (df['profit_loss'] / df['investment'] * 100).round(2)

    # 필요한 컬럼만 선택
    upload_data = df[[
        'date', 'company', 'signal_detail', 'target_price', 'profit_loss',
        'entry_time', 'first_action', 'second_action', 'query_notes',
        'investment', 'profit_percentage'
    ]].fillna('')

    # Supabase에 삽입
    print(f"Inserting {len(upload_data)} records...")

    for idx, row in upload_data.iterrows():
        data = {
            'date': row['date'],
            'company': row['company'],
            'signal_detail': row['signal_detail'],
            'target_price': row['target_price'],
            'profit_loss': row['profit_loss'],
            'entry_time': row['entry_time'],
            'first_action': row['first_action'],
            'second_action': row['second_action'],
            'query_notes': row['query_notes'],
            'investment': row['investment'],
            'profit_percentage': row['profit_percentage'],
        }

        response = supabase.table('trades').insert(data).execute()
        print(f"✓ {row['company']} ({row['date']})")

    print(f"\n완료! {len(upload_data)}개 거래 기록이 업로드되었습니다.")

except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
