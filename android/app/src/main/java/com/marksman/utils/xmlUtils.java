package com.marksman.utils;

import android.util.Xml;

import com.marksman.UdidBean;

import org.xmlpull.v1.XmlSerializer;

import java.io.Writer;

/**
 * Created by allen on 17/6/8.
 */

public class xmlUtils {
    public static void save(UdidBean udidBean, Writer writer) throws Throwable{
        XmlSerializer serializer = Xml.newSerializer();
        serializer.setOutput(writer);
        serializer.startDocument("UTF-8", true);

        serializer.startTag(null, "configs");
            serializer.startTag(null, "config");
            serializer.attribute(null, "id", udidBean.getUdid().toString());

            serializer.startTag(null, "udid");
            serializer.text(udidBean.getUdid().toString());
            serializer.endTag(null, "udid");
            serializer.endTag(null, "config");
        serializer.endTag(null, "configs");
        serializer.endDocument();
        writer.flush();
        writer.close();
    }

//    public static List<UdidBean> getUdid(InputStream inStream) throws Throwable{
//        List<UdidBean> udid = null;
//        UdidBean udidBean = null;
//        XmlPullParser parser = Xml.newPullParser();
//        parser.setInput(inStream, "UTF-8");
//        int eventType = parser.getEventType();//产生第一个事件
//        while(eventType!=XmlPullParser.END_DOCUMENT){//只要不是文档结束事件
//            switch (eventType) {
//                case XmlPullParser.START_DOCUMENT:
//                    udid = new ArrayList<UdidBean>();
//                    break;
//
//                case XmlPullParser.START_TAG:
//                    String name = parser.getName();//获取解析器当前指向的元素的名称
//                    if("udid".equals(name)){
//                        udidBean = new UdidBean();
//                        udidBean.setUdid("1234567890");
//                    }
//                    if(person!=null){
//                        if("name".equals(name)){
//                            person.setName(parser.nextText());//获取解析器当前指向元素的下一个文本节点的值
//                        }
//                        if("age".equals(name)){
//                            person.setAge(new Short(parser.nextText()));
//                        }
//                    }
//                    break;
//
//                case XmlPullParser.END_TAG:
//                    if("person".equals(parser.getName())){
//                        persons.add(person);
//                        person = null;
//                    }
//                    break;
//            }
//            eventType = parser.next();
//        }
//        return persons;
//    }
}
