package com.example.Back_End.Util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.common.BitMatrix;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class QRCodeGenerator {

    public String generateQRCode(String data) {
        try {
            int width = 300;
            int height = 300;
            Map<EncodeHintType, Object> hintMap = new HashMap<>();
            hintMap.put(EncodeHintType.MARGIN, 1); // No margin
            BitMatrix bitMatrix = new MultiFormatWriter().encode(data, BarcodeFormat.QR_CODE, width, height, hintMap);

            StringBuilder qrCodeImage = new StringBuilder();
            for (int y = 0; y < height; y++) {
                for (int x = 0; x < width; x++) {
                    qrCodeImage.append(bitMatrix.get(x, y) ? "1" : "0");
                }
            }
            return qrCodeImage.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
